# Prova de CRUD

Este projeto foi a realização de uma prova

[![Nome:](https://img.shields.io/badge/Nome-Gabriel_Oliveira_Borges-yellow)]()  
[![RA:](https://img.shields.io/badge/RA-24055138--2-green)]()  

## Instalação

Versão do node: 20+

Exemplo com NVM
```bash
node -v
nvm install 24
nvm use 24
```

## Como rodar

Banco
```bash
# irá subir o container docker 🐋
docker compose up -d
```

Backend
```bash
# irá espelhar o banco conforme arquivo schema.prisma e iniciar o back-end
cd server/
npm run dev
```

Frontend
```bash
# irá iniciar o vite
cd client/
npm run dev
```

Env
```bash
# Não há dados sensiveis neste .env
DATABASE_URL="postgresql://postgres:senha_segura@localhost:5432/postgres?schema=public"
```


## License

N/A