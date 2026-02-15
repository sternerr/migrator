# Database Migration Tool
A Node.js CLI tool to run SQL migrations.

>[!important]
> This tool is under development. Functionallity may be changed in the future

Databases:
  * PostgreSQL
  
## Installation
```bash
git clone https://github.com/sternerr/migrator
cd migrator
pnpm install
pnpm run build
pnpm link --global
```

### Usage
```
migrator create --filename=user
migrator up --connection-string=postgresql://username:password@host:port/dbname
migrator down --connection-string=postgresql://username:password@host:port/dbname
```
