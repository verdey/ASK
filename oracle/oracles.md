# 🔮 Oracle Registry

The kingdom-wide ledger of named Oracles. Each oracle is a markdown shard with
YAML frontmatter, stored at `oracles/<name>.md`.

**Surface:** <http://oracles.test/roster.php> (Roster tab).

**Schema:** see `_src/protocol.md` § Registry Format.

**Mutation:** Oracle (`/oracle`) is the only writer. Sp-prune walks shards.

**History:** the pre-shard monolithic registry is preserved at
`oracles.md.archive-2026-04-29` for cold-boot reconstruction. Do not edit the archive.

## Status counts

- Active:  3
- Paused:  0
- Retired: 18
