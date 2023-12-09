import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  OwnershipTransferRequested,
  OwnershipTransferred,
  Success
} from "../generated/TradeLinkCCIPV1/TradeLinkCCIPV1"

export function createOwnershipTransferRequestedEvent(
  from: Address,
  to: Address
): OwnershipTransferRequested {
  let ownershipTransferRequestedEvent = changetype<OwnershipTransferRequested>(
    newMockEvent()
  )

  ownershipTransferRequestedEvent.parameters = new Array()

  ownershipTransferRequestedEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  ownershipTransferRequestedEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )

  return ownershipTransferRequestedEvent
}

export function createOwnershipTransferredEvent(
  from: Address,
  to: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )

  return ownershipTransferredEvent
}

export function createSuccessEvent(
  offerId: BigInt,
  fulfillId: BigInt,
  sourceChain: BigInt,
  destChain: BigInt,
  userOffer: Address,
  userFulfill: Address
): Success {
  let successEvent = changetype<Success>(newMockEvent())

  successEvent.parameters = new Array()

  successEvent.parameters.push(
    new ethereum.EventParam(
      "offerId",
      ethereum.Value.fromUnsignedBigInt(offerId)
    )
  )
  successEvent.parameters.push(
    new ethereum.EventParam(
      "fulfillId",
      ethereum.Value.fromUnsignedBigInt(fulfillId)
    )
  )
  successEvent.parameters.push(
    new ethereum.EventParam(
      "sourceChain",
      ethereum.Value.fromUnsignedBigInt(sourceChain)
    )
  )
  successEvent.parameters.push(
    new ethereum.EventParam(
      "destChain",
      ethereum.Value.fromUnsignedBigInt(destChain)
    )
  )
  successEvent.parameters.push(
    new ethereum.EventParam("userOffer", ethereum.Value.fromAddress(userOffer))
  )
  successEvent.parameters.push(
    new ethereum.EventParam(
      "userFulfill",
      ethereum.Value.fromAddress(userFulfill)
    )
  )

  return successEvent
}
