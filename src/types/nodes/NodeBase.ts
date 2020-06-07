import { NodeKind } from '../NodeKind'
import { ILoc } from '../../interfaces'

/*
 * NodeBase type.
 */
export type NodeBase = {
  /**
   * Node kind.
   */
  kind: NodeKind

  /**
   * Node loc.
   */
  loc: ILoc
}
