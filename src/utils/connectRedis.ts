import { createClient } from 'redis';
import config from 'config';

const redisClient = createClient({
    password: config.get('redisPass'),
    socket: {
        host: config.get('redisHost'),
        port: config.get('redisPort')
    }
});

const connectRedis = async () => {
    try {
        await redisClient.connect();
        console.log('Redis client connected...');
    } catch (err: any) {
        console.log(err.message);
        setTimeout(connectRedis, 5000);
    }
};

connectRedis();

redisClient.on('error', (err) => console.log(err));

export default redisClient;
