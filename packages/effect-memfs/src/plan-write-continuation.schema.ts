import { Workflow } from '@systemfsoftware/effect-cell-types'
import { Schema } from 'effect'

const WriteAllChunkDecisionTypeId: unique symbol = Symbol.for(
  '@systemfsoftware/effect-memfs/WriteAllChunkDecision',
)
type WriteAllChunkDecisionTypeId = typeof WriteAllChunkDecisionTypeId

export class WriteContinued
  extends Schema.TaggedClass<WriteContinued, { readonly brand: unique symbol }>()('WriteContinued', {
    skip: Schema.Finite,
  })
{
  readonly [WriteAllChunkDecisionTypeId] = WriteAllChunkDecisionTypeId
}

export class WriteDrained
  extends Schema.TaggedClass<WriteDrained, { readonly brand: unique symbol }>()('WriteDrained', {})
{
  readonly [WriteAllChunkDecisionTypeId] = WriteAllChunkDecisionTypeId
}

export class WriteZero extends Schema.TaggedError<WriteZero, { readonly brand: unique symbol }>()('WriteZero', {
  fd: Schema.Finite,
  message: Schema.String,
  cause: Schema.optional(Schema.Unknown),
}) {
  readonly [WriteAllChunkDecisionTypeId] = WriteAllChunkDecisionTypeId
}

export const WriteAllChunkDecision = Schema.Union([WriteContinued, WriteDrained])
export type WriteAllChunkDecision = typeof WriteAllChunkDecision.Type

export class WriteAllChunk
  extends Schema.TaggedClass<WriteAllChunk, { readonly brand: unique symbol }>()('WriteAllChunk', {
    fd: Schema.Finite,
    written: Schema.Finite,
    remaining: Schema.Finite,
  })
{
  static readonly [Workflow.InstrumentationBrand] = {} as const
}
