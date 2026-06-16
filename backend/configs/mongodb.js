import mongoose from "mongoose";

const maskUri = (uri) => {
    if (!uri) return uri;
    return uri.replace(/(mongodb(?:\+srv)?:\/\/[^:]+:)[^@]+(@.*)/, '$1******$2');
}

const sanitizeMongodbUri = (uri) => {
    if (uri) {
        // Strip quotes and whitespace that could have been pasted by mistake in env config
        uri = uri.trim().replace(/^['"]|['"]$/g, '').trim();
    }
    
    if (!uri || !uri.toLowerCase().startsWith('mongodb+srv://')) {
        return uri;
    }
    try {
        const parsed = new URL(uri);
        if (parsed.port) {
            parsed.port = '';
            return parsed.toString();
        }
        return uri;
    } catch (e) {
        const doubleSlashIndex = uri.indexOf('//');
        if (doubleSlashIndex === -1) return uri;
        
        let hostStartIndex = uri.lastIndexOf('@');
        if (hostStartIndex === -1 || hostStartIndex < doubleSlashIndex) {
            hostStartIndex = doubleSlashIndex + 2;
        } else {
            hostStartIndex += 1;
        }
        
        let hostEndIndex = uri.indexOf('/', hostStartIndex);
        if (hostEndIndex === -1) {
            hostEndIndex = uri.indexOf('?', hostStartIndex);
        }
        if (hostEndIndex === -1) {
            hostEndIndex = uri.length;
        }
        
        const hostPart = uri.substring(hostStartIndex, hostEndIndex);
        const sanitizedHostPart = hostPart.replace(/:\d+$/, '');
        
        return uri.substring(0, hostStartIndex) + sanitizedHostPart + uri.substring(hostEndIndex);
    }
}

const connectDB = async () => {

    mongoose.connection.on('connected', () => {
        console.log("Database Connected");
    })

    if (!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI environment variable is missing. Please configure it in your Render environment settings.");
    }

    const sanitizedUri = sanitizeMongodbUri(process.env.MONGODB_URI);
    
    console.log(`Connecting to MongoDB using URI: ${maskUri(sanitizedUri)}`);

    await mongoose.connect(sanitizedUri, {
        dbName: 'ai-image'
    });

}

export default connectDB;