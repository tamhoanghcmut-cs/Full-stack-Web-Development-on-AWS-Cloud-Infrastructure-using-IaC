# TODO(WEB-05, owner=Phát): Image chạy được, smoke test xác nhận 201 và phản ánh tồn kho. Nghiệm thu: Chạy build Docker rồi chạy smoke test trên môi trường dev được duyệt.
FROM node:22-bookworm-slim AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS build
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM base AS runtime
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
COPY --chown=node:node --from=build /app/package.json ./
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/.next ./.next
USER node
EXPOSE 3000
CMD ["npm", "start"]
