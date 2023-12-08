import {
  Transfer as TransferEvent,
  BadApe as BadApeContract,
} from "../generated/BadApe/BadApe";
import { BadApeNft, User } from "../generated/schema";

export function handleTransfer(event: TransferEvent): void {
  let nft = BadApeNft.load(event.params.tokenId.toString());
  const badApeContact = BadApeContract.bind(event.address);

  if (!nft) {
    nft = new BadApeNft(event.params.tokenId.toString());
    nft.creator = event.params.to.toHexString();
    nft.tokenId = event.params.tokenId;
    nft.createdAtTimestamp = event.block.timestamp;
    nft.contentURI = badApeContact.tokenURI(event.params.tokenId);
  }

  nft.owner = event.params.to.toHexString();
  nft.save();

  let user = User.load(event.params.to.toString());
  if (!user) {
    user = new User(event.params.to.toHexString());
    user.save();
  }
}
