// require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient(); // uses schema.prisma datasource which reads env("DATABASE_URL")

module.exports = prisma;
