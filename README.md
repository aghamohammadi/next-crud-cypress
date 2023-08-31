
**

## Next js 13 FullStack CRUD Sample wtih Cypress 13 cucumber e2e Tests  & Prisma Postgres Database

**

**Demo Url** : https://next-crud-cypress.vercel.app/

**Screen shots :**

![Public Page](https://next-crud-cypress.vercel.app/shot/public.png)

![Admin Page ](https://next-crud-cypress.vercel.app/shot/admin.png)

## Getting Started

Assign Postgres Database Url Connection in **schema.prisma** File

    url = env("POSTGRES_PRISMA_URL") // uses connection pooling
    directUrl = env("POSTGRES_URL_NON_POOLING") // uses a direct

 run database commands to generate database :

    npx prisma generate
    npx prisma db push

 run the development :

    npm run dev

 run the production :

     npm run build
     npm run start

 run cypress e2e tests :

    cypress open


**
**

**Web developer & Author :**

Ahmad Aghamohammadi
ahmad.aghamohammadi@gmail.com
