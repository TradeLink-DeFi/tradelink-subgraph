import {
  Transfer as TransferEvent,
  KoiCrapNft as KoiCrapContract,
} from "../generated/KoiCrapNft/KoiCrapNft";
import { KoiCrapNft, User } from "../generated/schema";

export function handleTransfer(event: TransferEvent): void {
  let nft = KoiCrapNft.load(event.params.tokenId.toString());
  const koiCrapContract = KoiCrapContract.bind(event.address);

  if (!nft) {
    nft = new KoiCrapNft(event.params.tokenId.toString());
    nft.creator = event.params.to.toHexString();
    nft.tokenId = event.params.tokenId;
    nft.createdAtTimestamp = event.block.timestamp;
    nft.contentURI = koiCrapContract.tokenURI(event.params.tokenId);
  }

  nft.owner = event.params.to.toHexString();
  nft.save();

  let user = User.load(event.params.to.toString());
  if (!user) {
    user = new User(event.params.to.toHexString());
    user.save();
  }
}
