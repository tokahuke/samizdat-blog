---
title: "Network"
date: 2021-10-29T00:08:00-03:00
type: docs
menu:
    docs:
        parent: "Architecture"
        weight: 10
---

# The SAMIZDAT network overview

The SAMIZDAT network is a decentralized network that runs on the Internet as a _hybrid_ peer-to-peer network. With _hybrid_, I mean that there _is_ still some centralization in the network, in contrast with a purely mesh-like network. The partial centralization happens in the _hubs_, which are intermediary agents to which the actual nodes of the network connect. However, only signaling and coordination beteen nodes happens in the hubs; the actual network-intenisve data transfer happens purely peer-to-peer. This structure is very similar to what most torrenting networks implement.

Why use such a hybrid model for the SAMIZDAT network? The reason is simple: firewalls. Nodes are meant to run with little configuration by end-users, most of which are not tech-savy. They are mainly using a work or home WiFi connection to an Internet Service Provider. This kind of local are networks are almost always protected by firewalls, which, on the least strict level, only allow "outgoing connections". This simply throws a wrench in any plan for a pure peer-to-peer network. As it can be seen in the desing of WebRTC, some shenenigans with servers in the "open Internet" are necessary to establish a connection with peers. This is the main attributions of a SAMIZDAT network hub.

Hubs are meant to run in the "open Internet" by more tech-savy people or by a managed SaaS and to have a public DNS. They multicast queries on entities in the network from one node to ohters in an adaptative way, prioritizing those most likely to have the answers to the queries. Then, when a query is answered correctly, the hub introduces the peers to each other so that they can privately exchange information, without the intermediation of the hub. 

## The protocol stack

### IPv6

As of now, the whole SAMIZDAT network runs on the IPv6 network _only_. This is a known issue that may be solved in the future, or not. As of 2021, IPv6 is well-supported by most ISPs around the world, even in developing countries, from which I write. Adoption is slow, but steady. The reason for preferring IPv6 over IPv4 is that the abundance of IPv6 simplfies the problems with NAT-traversal and (even worse) carrier grade NAT-traversal. With IPv4, it is just impossible for two computers in the same household (and with carrier-grade NAT, even in the same neighborhood) to connect to each other.

There are, of course many tricks one can use to circumvent these unfortunate hacks to the global Internet, from port scanning to STUN servers. However, I have not had the time to implement or hunt for a solution that implements this for me. Besides, these problems _do not exist_ in the IPv6 network, where addresses are plentiful. Therefore, out from simplicity, this has remained an "open issue". If you _only_ have an IPv4 connection, you can still use SAMIZDAT, since any decent OS in 2021 implements IPv6 tunneling over IPv4, at least until it reaches your WiFi antenna. You can discover if that is the case if your alloted IPv6 starts with `ffff:`. However, note that you may occasionaly experience some bugs. 


### UDP+QUIC

In the business of firewall traversal, UDP has always been the preferred choice. TCP has always proved to be too complex to be able to bend easly around the weirdness required for firewall traversal. At the same time, the "file" analogy of TCP is too simplstic for the asynchronous nature of a peer-to-peer application. Enter QUIC!

QUIC is a transport protocol developed by Google aimed to solve some limitations of TPC, most of them focused on it not playing very well with asynchonous application, providing security out-of-the box and making connection establishment more expedient. This is the preferred transport protocol between Google Chrome and Google servers around the world, with proven improved user experience. And it is also open source. 

QUIC has shown to be better to develop SAMIZDAT than TCP by fitting better to the messaging model of the protocol. It can be more asynchronous than TCP, but still _not_ be so bare-metal such as pure UDP. With QUIC, just as in TCP, message delivery is guaranteed and there are mechanism for congestion control.


### RPC

For the communication between hub and node (but not between node and node), SAMIZDAT uses a _remote procedure call_ framework, namely TARPC, an easy to use RPC library for Rust. Remote procedure calls are very similar to normal REST calls, but are substantially leaner (e.g., they can be used for high-performance inter-process communication). Most RPC frameworks, TARPC included, work in a client-server fashion, just like a REST API would. However, the communication between hub and node does not fit neatly into this architecture.

To solve this, there are _two_ RPC interfaces: one from node to hub, called the _direct_ RPC, and another from hub to node, called the _reverse_ RPC. Each of these RPCs are served by their own QUIC connections in different ports. This arcitecture allows the hub to be a broadcaster of messages to nodes, like so:

1. Node A sends a request to the hub using the _direct_ RPC.
2. The node sends nodes B and C the request from A using the _reverse_ RPC.
3. Node B and C send their response to the hub using the _direct_ RPC.
4. The hub send node A the response from both B and C using the _reverse_ RPC.

This pattern occurs time and time again in the resolution steps of entities in the network, as will be shown later. This kind of communication is not possible inside a strictly client-server architecture.


## Default ports

SAMIZDAT uses mainly three distinct ports for communication:

* `4510/tcp`: serves the proxy between the SAMIZDAT and the browser together with the node administration HTTP REST API (à la Docker). This service will by now _only_ accept connections from `localhost`. No guest or intruders allowed.
* `4511/udp`: serves the _direct_ RPC in the SAMIZDAT hub. The node may connect from any port, including from ephemeral ports.
* `4512/udp`: serves the _reverse_ RPC in the SAMIZDAT hub. The node may connect from any port, including from ephemeral ports.

These are the ports to be understanded when no port is specified in the context of each service.


## Security

QUIC provides TLS security out-of-the box and this feature cannot be turned off. However, the resolution protocols running in the SAMIZDAT network provide their own, sometimes slightly different security guarantees. Therefore, security in this layer is kept to a minimal to avoid unnecessary setup hassle. Specifically, all QUIC connections are established using only self-signed certificates, which provide some privacy between the parts but no authentication whatsover. This must be kept in mind when developing extensions for SAMIZDAT, as it might be the source of pitfalls. 

