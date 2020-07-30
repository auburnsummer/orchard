/**
 * IPFS is a peer-to-peer file sharing system. It's cool in theory, but in
 * practice since approximately 0 people have IPFS clients we typically use
 * one of these gateways. 
 * 
 * Using a gateway incurs less bandwidth on our server (since the content can
 * be served from other IPFS nodes instead of just us), but at a latency cost.
 */

import _ from "lodash";

const IPFS_GATEWAYS = [
    "https://ipfs.io/ipfs/",
    "https://10.via0.com/ipfs/",
    "https://cloudflare-ipfs.com/ipfs/",
    "https://gateway.pinata.cloud/ipfs/"
]

export const HOST = "https://ipfs.rhythm.cafe/ipfs/"

export const getRandomGateway = () => {
    return _.sample(IPFS_GATEWAYS);
}