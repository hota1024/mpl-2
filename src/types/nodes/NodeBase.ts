import { NodeKind } from '../NodeKind'
import { ILoc } from '../../interfaces'

/*
 * NodeBase type.
 */
export type NodeBase<Kind extends NodeKind> = {
  /**
   * Node kind.
   */
  kind: Kind

  /**
   * Node loc.
   */
  loc: ILoc
}
