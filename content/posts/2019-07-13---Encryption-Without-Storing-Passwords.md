---
title: Encryption Without Storing Passwords
date: "2019-07-13T20:25:07.739Z"
template: "post"
draft: false
slug: "/posts/encryption-without-storing-passwords/"
category: "Cryptography"
tags:
  - "JavaScript"
  - "Cryptography"
  - "NodeJS"
  - "Password Security"
description: "How to generate encrypted keys without storing passwords anywhere."

---
- [Cryptography overview](#Cryptography-overview)
- [Key Stretching](#Key-Stretching)
- [Preventing Side Channel attacks with Blinding](#Preventing-Side-Channel-attacks-with-Blinding)
- [Blinding example](#Blinding-example)



## Cryptography overview

Cryptography is a tool or a technique used to __communicate privately__ between two parties, a sender and a receiver. Alice and Bob denote a pair of hypothetical individuals attempting to send and receive transmissions without that pesty Carol intercepting, or even worse impersonating, messages.

Encryption is the cornerstone of a cryptographic solution. An encrypted message will appear unrecognizable from the original and be decrypted and identical to the original message. [Public Key Cryptography](https://en.wikipedia.org/wiki/Public-key_cryptography) is a strategy that uses encryption along with Public and Private keys. The owner of keys should be able to use both the receiver's public key and the owner's private key to generate a hash function that encrypts the sender's message and decrypts the message for the recipient.

Another crucial aspect of a Public Key Cryptography system is the Distribution Obtainment of keys. Man in the Middle (MITM) attacks must be considered by the system so that both message owners and receivers are confident the message was delivered from and to its original sender and intended receiver.

## Key Stretching

Did you know you can take a terrible password, one that is relatively easy for a brute force algorithm to guess, and turn it into a impossible-to-crack key? Let's consider this dreadfully weak password...

```
P4$$w0Rd
```

> It would take a computer about 9 HOURS to crack your password
> [How Secure Is My Password](https://howsecureismypassword.net/)

__KEY STRETCHING (simple pattern)__

```
----------------P4$$w0Rd----------------
```

> It would take a computer about 26 QUATTUORDECILLION YEARS (26 * 10^43) to crack your password
> [How Secure Is My Password](https://howsecureismypassword.net/)

__KEY STRETCHING (alternate pattern)__

```
a-_-_-_-_-_-_-_-_P4$$w0Rd_-_-_-_-_-_-_-_-z
```

> It would take a computer about 43 QUINDECILLION YEARS (43 * 10^47) to crack your password
> [How Secure Is My Password](https://howsecureismypassword.net/)

This is a derived example of the concept of key stretching. Consider [`PBKDF2`](https://en.wikipedia.org/wiki/PBKDF2), a __key derivation function__ that deterministically stretches any string, transforming it into an unrecognizable result.

## Preventing Side Channel attacks with Blinding

> In computer security, a [side-channel attack](https://en.wikipedia.org/wiki/Side-channel_attack) is any attack based on information gained from the implementation of a computer system, rather than weaknesses in the implemented algorithm itself (e.g. cryptanalysis and software bugs). Timing information, power consumption, electromagnetic leaks or even sound can provide an extra source of information, which can be exploited.

[Blinding](https://en.wikipedia.org/wiki/Blinding_(cryptography)) is a technique used to prevent side channel attacks by computing a hash function and using that to index rather than the original search term. When a hacker tries to use the hash function to look up the original key, they'll have no way of knowing how to convert that hashed function into the original search term.

## Blinding example

To see a solution that uses Blinding and a salt for additional security, please see my [example on github](https://github.com/marclundgren/blind-index-encryption/blob/master/README.md).

