"use client";

import { Client, Models, ID, Databases, Storage } from "appwrite";
import { User } from "./interface";
import { Client as SdkClient, Databases as SdkDatabases, Permission, Role } from "node-appwrite";
import { auth } from "../utils/firebase";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser
} from "firebase/auth";

interface Sponsors {
  id: number;
  name: string;
  url: string;
}

class ServerConfig {
  client: SdkClient = new SdkClient();
  regDb: string = `${process.env.NEXT_PUBLIC_REGDB}`;
  sponDb: string = `${process.env.NEXT_PUBLIC_SPODB}`;
  databases: SdkDatabases = new SdkDatabases(this.client);

  constructor() {
    this.client
      .setEndpoint(`${process.env.NEXT_PUBLIC_ENDPOINT}`)
      .setProject(`${process.env.NEXT_PUBLIC_PROJECTID}`)
      .setKey(`${process.env.NEXT_PUBLIC_DBKEY}`);
  }

  createRegColl(id: string, name: string) {
    this.databases
      .createCollection(this.regDb, id, name, [
        Permission.read(Role.any()),
        Permission.update(Role.any()),
        Permission.create(Role.any()),
        Permission.delete(Role.any()),
      ])
      .then((res) => {
        this.databases.createStringAttribute(this.regDb, id, "name", 50, false);
        this.databases.createStringAttribute(this.regDb, id, "email", 50, false);
        this.databases.createStringAttribute(this.regDb, id, "confirm", 50, false, "");
      });
  }

  createSponColl(id: string, name: string, sponsor: Sponsors[], user: string) {
    this.databases
      .createCollection(this.sponDb, id, name, [
        Permission.read(Role.any()),
        Permission.update(Role.user(user)),
        Permission.create(Role.user(user)),
        Permission.delete(Role.user(user)),
      ])
      .then((res) => {
        this.databases
          .createStringAttribute(this.sponDb, id, "name", 50, false)
          .then((res) => {
            this.databases
              .createStringAttribute(this.sponDb, id, "url", 50, false)
              .then((res) => {
                for (var i = 0; i < sponsor.length; i++) {
                  this.databases.createDocument(this.sponDb, id, ID.unique(), {
                    name: sponsor[i].name,
                    url: sponsor[i].url,
                  });
                }
              });
          });
      });
  }
}

class FirebaseAppwriteConfig {
  databaseId: string = `${process.env.NEXT_PUBLIC_DATABASEID}`;
  activeCollId: string = `${process.env.NEXT_PUBLIC_EVENT_COLLID}`;
  bannerBucketId: string = `${process.env.NEXT_PUBLIC_EVENTBUCKET}`;
  regDbId: string = `${process.env.NEXT_PUBLIC_REGDB}`;

  client: Client = new Client();
  databases: Databases = new Databases(this.client);
  regDb: Databases = new Databases(this.client);
  storage: Storage = new Storage(this.client);
  user: User = {} as User;

  constructor() {
    this.client
      .setEndpoint(`${process.env.NEXT_PUBLIC_ENDPOINT}`)
      .setProject(`${process.env.NEXT_PUBLIC_PROJECTID}`);
  }

  // Firebase authentication methods
  emailSignUp(name: string, email: string, password: string): Promise<any> {
    if (!auth) throw new Error("Firebase auth not initialized");
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed up:", user);
        return user;
      })
      .catch((error) => {
        console.error("Error signing up:", error);
        throw error;
      });
  }

  emailLogin(email: string, password: string): Promise<any> {
    if (!auth) throw new Error("Firebase auth not initialized");
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User logged in:", user);
        return user;
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        throw error;
      });
  }

  signOut(): Promise<boolean> {
    if (!auth) throw new Error("Firebase auth not initialized");
    return firebaseSignOut(auth)
      .then(() => {
        console.log("User signed out");
        localStorage.removeItem("userInfo");
        return true;
      })
      .catch((error) => {
        console.error("Error signing out:", error);
        return false;
      });
  }

  getCurUser(): Promise<User | null> {
    if (!auth) throw new Error("Firebase auth not initialized");
    return new Promise((resolve) => {
      if (!auth) {
        resolve(null);
        return;
      }
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = {
            $id: user.uid,
            name: user.displayName || "",
            email: user.email || "",
            $createdAt: user.metadata?.creationTime || "",
            $updatedAt: user.metadata?.lastSignInTime || "",
          } as User;
          localStorage.setItem("userInfo", JSON.stringify(this.user));
          resolve(this.user);
        } else {
          localStorage.removeItem("userInfo");
          resolve(null);
        }
      });
    });
  }

  // Appwrite methods for database operations
  createEvent(
    eventname: string,
    description: string,
    banner: File,
    hostname: string,
    eventdate: string,
    email: string,
    country: string,
    address: string,
    city: string,
    state: string,
    postal: string,
    audience: string,
    type: string,
    attendees: number,
    price: number,
    tech: string,
    agenda: string,
    sponsor: Sponsors[],
    approval: string,
    twitter: string,
    website: string,
    linkedin: string,
    instagram: string
  ): Promise<String> {
    try {
      const currentUser = auth?.currentUser;
      if (!currentUser) throw new Error("User not authenticated");
      
      return this.storage
        .createFile(this.bannerBucketId, ID.unique(), banner)
        .then((res) => {
          return this.databases
            .createDocument(this.databaseId, this.activeCollId, ID.unique(), {
              eventname: eventname,
              description: description,
              url: `${process.env.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${this.bannerBucketId}/files/${res.$id}/view?project=${process.env.NEXT_PUBLIC_PROJECTID}&mode=admin`,
              hostname: hostname,
              eventdate: eventdate,
              email: email,
              country: country,
              address: address,
              city: city,
              state: state,
              postal: postal,
              audience: audience,
              type: type,
              attendees: attendees,
              price: price,
              tech: tech,
              agenda: agenda,
              approval: approval,
              created: currentUser.uid,
              twitter: twitter,
              website: website,
              linkedin: linkedin,
              instagram: instagram,
              registrations: [],
            })
            .then((res) => {
              const serverConfig = new ServerConfig();
              serverConfig.createRegColl(res.$id, eventname);
              serverConfig.createSponColl(res.$id, eventname, sponsor, currentUser.uid);
              return Promise.resolve("success");
            });
        });
    } catch (error) {
      console.log("error block 1");
      throw error;
    }
  }
}

export { FirebaseAppwriteConfig as AppwriteConfig, ServerConfig };
