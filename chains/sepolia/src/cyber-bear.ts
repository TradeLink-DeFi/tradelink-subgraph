import {
  Transfer as TransferEvent,
  CyberBear as CyberBearContract,
} from "../generated/CyberBear/CyberBear";
import { CyberBearNft, User } from "../generated/schema";

export function handleTransfer(event: TransferEvent): void {
  let nft = CyberBearNft.load(event.params.tokenId.toString());
  const cyberBearContact = CyberBearContract.bind(event.address);

  if (!nft) {
    nft = new CyberBearNft(event.params.tokenId.toString());
    nft.creator = event.params.to.toHexString();
    nft.tokenId = event.params.tokenId;
    nft.createdAtTimestamp = event.block.timestamp;
    nft.contentURI = cyberBearContact.tokenURI(event.params.tokenId);
  }

  nft.owner = event.params.to.toHexString();
  nft.save();

  let user = User.load(event.params.to.toString());
  if (!user) {
    user = new User(event.params.to.toHexString());
    user.save();
  }
}
