import { Workflow } from '@systemfsoftware/effect-cell-types'
import { Schema } from 'effect'

const TruncateCursorDecisionTypeId: unique symbol = Symbol.for(
  '@systemfsoftware/effect-memfs/TruncateCursorDecision',
)
type TruncateCursorDecisionTypeId = typeof TruncateCursorDecisionTypeId

export class CursorKept extends Schema.TaggedClass<CursorKept, { readonly brand: unique symbol }>()('CursorKept', {
  position: Schema.BigInt,
}) {
  readonly [TruncateCursorDecisionTypeId] = TruncateCursorDecisionTypeId
}

export class CursorClamped
  extends Schema.TaggedClass<CursorClamped, { readonly brand: unique symbol }>()('CursorClamped', {
    position: Schema.BigInt,
  })
{
  readonly [TruncateCursorDecisionTypeId] = TruncateCursorDecisionTypeId
}

export const TruncateCursorDecision = Schema.Union([CursorKept, CursorClamped])
export type TruncateCursorDecision = typeof TruncateCursorDecision.Type

export class PlanTruncateCursor
  extends Schema.TaggedClass<PlanTruncateCursor, { readonly brand: unique symbol }>()('PlanTruncateCursor', {
    position: Schema.BigInt,
    length: Schema.Int,
  })
{
  static readonly [Workflow.InstrumentationBrand] = {} as const
}
