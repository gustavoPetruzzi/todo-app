const express = require('express');
const app = express();

required('dotenv').confing();

const PORT = process.env.PORT || 3000;
