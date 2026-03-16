FROM node:20-alpine AS deps

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Prepare knex runtime assets (js migrations + compiled seeds)
RUN rm -rf db/seeds \
  && mkdir -p db/seeds \
  && cp -r dist/db/seeds/* db/seeds/ \
  && rm -f db/seeds/*.d.ts db/seeds/*.map \
  && cp dist/knexfile.js knexfile.js

FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=deps /app/dist ./dist
COPY --from=deps /app/knexfile.js ./knexfile.js
COPY --from=deps /app/db ./db

EXPOSE 3000
CMD ["node", "dist/src/main"]
