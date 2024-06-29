# Setup Project

```
git clone https://github.com/exoream/typescript-clean-architecture.git
```

## Install Dependencies
```
npm install
```

## Create .env file
```
DATABASE_URL="mysql://root:mypassword@localhost:3306/mydb"
```

## Setup Database
```
# Menerapkan migrasi database
npx prisma migrate dev

# Menghasilkan client Prisma
npx prisma generate
```

## Build and Start the Project
```
# Kompilasi proyek
npm run build

# Mulai server
npm run start
```
