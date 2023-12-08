import {
  Transfer as TransferEvent,
  Golem8bitNft as Golem8bitNftContract,
} from "../generated/Golem8bitNft/Golem8bitNft";
import { Golem8bitNft, User } from "../generated/schema";

export function handleTransfer(event: TransferEvent): void {
  let nft = Golem8bitNft.load(event.params.tokenId.toString());
  const golem8bitNftContract = Golem8bitNftContract.bind(event.address);

  if (!nft) {
    nft = new Golem8bitNft(event.params.tokenId.toString());
    nft.creator = event.params.to.toHexString();
    nft.tokenId = event.params.tokenId;
    nft.createdAtTimestamp = event.block.timestamp;
    nft.contentURI = golem8bitNftContract.tokenURI(event.params.tokenId);
  }

  nft.owner = event.params.to.toHexString();
  nft.save();

  let user = User.load(event.params.to.toString());
  if (!user) {
    user = new User(event.params.to.toHexString());
    user.save();
  }
}
