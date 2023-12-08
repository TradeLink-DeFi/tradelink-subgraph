import {
  Transfer as TransferEvent,
  GoldenBullNft as GoldenBullContract,
} from "../generated/GoldenBullNft/GoldenBullNft";
import { GoldenBullNft, User } from "../generated/schema";

export function handleTransfer(event: TransferEvent): void {
  let nft = GoldenBullNft.load(event.params.tokenId.toString());
  const badApeContact = GoldenBullContract.bind(event.address);

  if (!nft) {
    nft = new GoldenBullNft(event.params.tokenId.toString());
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
