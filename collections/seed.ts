import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { connect, disconnect } from 'mongoose';
import * as path from 'path';
import { User } from '../backend/src/models/user.model';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../backend/.env') });

async function seedDatabase() {
    try {
        console.log('🌱 Starting database seeding...');

        // Connect to MongoDB
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/meanapp';
        await connect(mongoUri);
        console.log('✅ Connected to MongoDB');

        // Read mock users data
        const usersPath = path.join(__dirname, 'users.json');
        const usersData = JSON.parse(fs.readFileSync(usersPath, 'utf8'));

        // Clear existing users (optional - comment out if you want to keep existing data)
        console.log('🗑️ Clearing existing users...');
        await User.deleteMany({});

        // Insert mock users
        console.log('📝 Inserting mock users...');
        const insertedUsers = await User.insertMany(usersData);

        console.log(`✅ Successfully inserted ${insertedUsers.length} users:`);
        insertedUsers.forEach(user => {
            console.log(`   - ${user.username} (${user.userType})`);
        });

    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    } finally {
        // Disconnect from MongoDB
        await disconnect();
        console.log('👋 Disconnected from MongoDB');
        process.exit(0);
    }
}

// Run the seeding function
seedDatabase();
