import {
  CreateFulfill as CreateFulfillEvent,
  CreateOffer as CreateOfferEvent,
  OwnershipTransferRequested as OwnershipTransferRequestedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Success as SuccessEvent
} from "../generated/TradeLinkCCIPV1/TradeLinkCCIPV1"
import {
  CreateFulfill,
  CreateOffer,
  OwnershipTransferRequested,
  OwnershipTransferred,
  Success
} from "../generated/schema"

export function handleCreateFulfill(event: CreateFulfillEvent): void {
  let entity = new CreateFulfill(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.fulfillId = event.params.fulfillId
  entity.ownerFulfill = event.params.ownerFulfill

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCreateOffer(event: CreateOfferEvent): void {
  let entity = new CreateOffer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.offerId = event.params.offerId
  entity.ownerOffer = event.params.ownerOffer

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferRequested(
  event: OwnershipTransferRequestedEvent
): void {
  let entity = new OwnershipTransferRequested(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSuccess(event: SuccessEvent): void {
  let entity = new Success(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.offerId = event.params.offerId
  entity.fulfillId = event.params.fulfillId
  entity.sourceChain = event.params.sourceChain
  entity.destChain = event.params.destChain
  entity.userOffer = event.params.userOffer
  entity.userFulfill = event.params.userFulfill

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
