// import env variables
import dotenv from 'dotenv';
import prodSeed from './prodSeeding';
import devSeed from './devSeeding';
dotenv.config();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'development') {
	devSeed();
} else if (process.env.NODE_ENV === 'production') {
	prodSeed();
}
