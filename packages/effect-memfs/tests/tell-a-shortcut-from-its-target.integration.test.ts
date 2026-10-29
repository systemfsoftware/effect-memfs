import { Gherkin, Given, it, makeFeature, Then, When } from '@systemfsoftware/effect-gherkin-spec'
import { MemoryFileSystem } from '@systemfsoftware/effect-memfs'
import { Effect } from 'effect'
import * as FileSystem from 'effect/FileSystem'

const Feature = makeFeature({ it })

const withShortcut = MemoryFileSystem.make({ '/notes/hello.txt': 'hello', '/notes/more/deep.txt': 'deep' })
const filesystem = Effect.service(FileSystem.FileSystem)

const shortcut = '/notes/shortcut.txt'
const dangling = '/notes/dangling.txt'

Feature('Telling a shortcut apart from the file it points at')
  .withScenarioLayer(withShortcut.layer)
  .body(({ scenario, scenarioOutline }) => {
    scenario(
      'Looking at a shortcut without following it reports a shortcut',
      Gherkin.Do.pipe(
        Given('a filesystem holding a shortcut to a note')('fs', () => filesystem),
        When('the shortcut is looked at without following it')('info', (s) =>
          Effect.flatMap(
            s.fs.symlink('/notes/hello.txt', shortcut),
            () => s.fs.lstat(shortcut),
          )),
        Then('it is reported as a shortcut')((s, expect) => expect(s.info.type).toBe('SymbolicLink')),
      ),
    )

    scenario(
      'Looking at a shortcut and following it reports the note',
      Gherkin.Do.pipe(
        Given('a filesystem holding a shortcut to a note')('fs', () => filesystem),
        When('the shortcut is looked at after following it')('info', (s) =>
          Effect.flatMap(
            s.fs.symlink('/notes/hello.txt', shortcut),
            () => s.fs.stat(shortcut),
          )),
        Then('it is reported as the file behind it')((s, expect) => expect(s.info.type).toBe('File')),
      ),
    )

    scenario(
      'A shortcut whose note is missing can still be looked at without following it',
      Gherkin.Do.pipe(
        Given('a filesystem holding a shortcut to a note nobody saved')('fs', () => filesystem),
        When('the shortcut is looked at without following it')('info', (s) =>
          Effect.flatMap(
            s.fs.symlink('/notes/absent.txt', dangling),
            () => s.fs.lstat(dangling),
          )),
        Then('it is reported as a shortcut')((s, expect) => expect(s.info.type).toBe('SymbolicLink')),
      ),
    )

    scenarioOutline(
      'Looking at a <thing> without following shortcuts reports a <type>',
      [
        { thing: 'note', path: '/notes/hello.txt', type: 'File' },
        { thing: 'folder', path: '/notes/more', type: 'Directory' },
      ],
      (row) =>
        Gherkin.Do.pipe(
          Given('a filesystem holding a notes folder')('fs', () => filesystem),
          When('it is looked at without following shortcuts')('info', (s) => s.fs.lstat(row.path)),
          Then('it is reported for what it is')((s, expect) => expect(s.info.type).toBe(row.type)),
        ),
    )

    scenario(
      'Looking at a note nobody saved is turned down, and which attempt failed',
      Gherkin.Do.pipe(
        Given('a filesystem holding a notes folder')('fs', () => filesystem),
        When('a note that was never saved is looked at without following shortcuts')(
          'outcome',
          (s) => Effect.flip(s.fs.lstat('/notes/absent.txt')),
        ),
        Then('the caller is told the note is missing')((s, expect) =>
          expect({ _tag: s.outcome.reason._tag, method: s.outcome.reason.method }).toEqual({
            _tag: 'NotFound',
            method: 'lstat',
          })
        ),
      ),
    )

    scenario(
      'Listing a folder with kinds tells a shortcut from a note and a folder',
      Gherkin.Do.pipe(
        Given('a filesystem holding a shortcut to a note')('fs', () => filesystem),
        When('the notes folder is listed with kinds')('entries', (s) =>
          Effect.flatMap(
            s.fs.symlink('/notes/hello.txt', shortcut),
            () => s.fs.readDirectoryEntries('/notes'),
          )),
        Then('each entry carries its own kind, the shortcut is not followed')((s, expect) =>
          expect(s.entries.toSorted((left, right) => left.name.localeCompare(right.name))).toEqual([
            { name: 'hello.txt', type: 'File' },
            { name: 'more', type: 'Directory' },
            { name: 'shortcut.txt', type: 'SymbolicLink' },
          ])
        ),
      ),
    )

    scenario(
      'Searching the notes by pattern finds the matching notes beneath the root',
      Gherkin.Do.pipe(
        Given('a filesystem holding a notes folder')('fs', () => filesystem),
        When('every text note beneath the notes folder is searched for')(
          'matches',
          (s) => s.fs.glob('**/*.txt', { root: '/notes' }),
        ),
        Then('both notes are found')((s, expect) =>
          expect(s.matches.toSorted()).toEqual(['hello.txt', 'more/deep.txt'])
        ),
      ),
    )
  })
