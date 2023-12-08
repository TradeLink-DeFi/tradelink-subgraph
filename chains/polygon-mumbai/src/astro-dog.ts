import {
  Transfer as TransferEvent,
  AstroDog as AstroDogContract,
} from "../generated/AstroDog/AstroDog";
import { AstroDogNft, User } from "../generated/schema";

export function handleTransfer(event: TransferEvent): void {
  let nft = AstroDogNft.load(event.params.tokenId.toString());
  const astroDogContract = AstroDogContract.bind(event.address);

  if (!nft) {
    nft = new AstroDogNft(event.params.tokenId.toString());
    nft.creator = event.params.to.toHexString();
    nft.tokenId = event.params.tokenId;
    nft.createdAtTimestamp = event.block.timestamp;
    nft.contentURI = astroDogContract.tokenURI(event.params.tokenId);
  }

  nft.owner = event.params.to.toHexString();
  nft.save();

  let user = User.load(event.params.to.toString());
  if (!user) {
    user = new User(event.params.to.toHexString());
    user.save();
  }
}
