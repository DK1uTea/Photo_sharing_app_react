import mongoose from "mongoose";
import UserModel from './models/UserModel.js';
import PhotoModel from './models/PhotoModel.js';
import CommentModel from './models/CommentModel.js';

const URI = process.env.URI_DB;

const users = [
    //im
    {
        _id: new mongoose.Types.ObjectId('57231f1a30e4351f4e9f4bd7'),
        first_name: "Ian",
        last_name: "Malcolm",
        location: "Austin, TX",
        description: "Should've stayed in the car.",
        occupation: "Mathematician",
        email: "",
        password: ""
    },
    //er
    {
        _id: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4bd8"),
        first_name: "Ellen",
        last_name: "Ripley",
        location: "Nostromo",
        description: "Lvl 6 rating. Pilot.",
        occupation: "Warrant Officer",
        email: "",
        password: ""
    },
    //pt
    {
        _id: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4bd9"),
        first_name: "Peregrin",
        last_name: "Took",
        location: "Gondor",
        description: "Home is behind, the world ahead... " + 
                    "And there are many paths to tread. Through shadow, to the edge of night, " + 
                    "until the stars are all alight... Mist and shadow, cloud and shade, " + 
                    "all shall fade... all... shall... fade... ",
        occupation: "Thain",
        email: "",
        password: ""
    },
    //rk
    {
        _id: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4bda"),
        first_name: "Rey",
        last_name: "Kenobi",
        location: "D'Qar",
        description: "Excited to be here!",
        occupation: "Rebel",
        email: "",
        password: ""
    },
    //al
    {
        _id: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4bdb"),
        first_name: "April",
        last_name: "Ludgate",
        location: "Pawnee, IN",
        description: "Witch",
        occupation: "Animal Control",
        email: "",
        password: ""
    },
    //jo
    {
        _id: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4bdc"),
        first_name: "John",
        last_name: "Ousterhout",
        location: "Stanford, CA",
        description: "<i>CS142!</i>",
        occupation: "Professor",
        email: "",
        password: ""
    }
];

const photos = [
    //photo1
    {
        _id: new mongoose.Types.ObjectId('57231f1a30e4351f4e9f4bdd'),
        date_time: "2012-08-30 10:44:23",
        file_name: "ouster.jpg",
        user_id: new mongoose.Types.ObjectId('57231f1a30e4351f4e9f4bdc') //jo._id
    },
    //photo2
    {
        _id: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4bde"),
        date_time: "2009-09-13 20:00:00",
        file_name: "malcolm2.jpg",
        user_id: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4bd7") //im._id
    },
    //photo3
    {
        _id: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4bdf"),
        date_time: "2009-09-13 20:05:03",
        file_name: "malcolm1.jpg",
        user_id: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4bd7") //im._id
    },
    //photo4
    {
        _id: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4be0"),
        date_time: "2013-11-18 18:02:00",
        file_name: "ripley1.jpg",
        user_id: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4bd8") //er._id
    }, 
    //photo5
    {
        _id: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4be1"),
        date_time: "2013-09-20 17:30:00",
        file_name: "ripley2.jpg",
        user_id: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4bd8") //er._id
    }, 
    //photo6
    {
        _id: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4be2"),
        date_time: "2009-07-10 16:02:49",
        file_name: "kenobi1.jpg",
        user_id: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4bda") //rk._id
    },
    //photo7
    {
        _id: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4be3"),
        date_time: "2010-03-18 23:48:00",
        file_name: "kenobi2.jpg",
        user_id: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4bda") //rk._id
    },
    //photo8
    {
        _id: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4be4"),
        date_time: "2010-08-30 14:26:00",
        file_name: "kenobi3.jpg",
        user_id: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4bda") //rk._id
    },
    //photo9
    {
        _id: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4be5"),
        date_time: "2013-12-03 09:02:00",
        file_name: "took1.jpg",
        user_id: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4bd9") //pt._id
    },
    //photo10 
    {
        _id: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4be6"),
        date_time: "2013-12-03 09:03:00",
        file_name: "took2.jpg",
        user_id: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4bd9") //pt._id
    },
    //photo11
    {
        _id: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4be7"),
        date_time: "2013-09-04 09:16:32",
        file_name: "ludgate1.jpg",
        user_id: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4bdb") //al._id
    },
    //photo12
    {
        _id: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4be8"),
        date_time: "2008-10-16 17:12:28",
        file_name: "kenobi4.jpg",
        user_id: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4bda") //rk._id
    }
];

const comments = [
    //comment1
    {
        _id: new mongoose.Types.ObjectId('57231f1a30e4351f4e9f4be9'),
        date_time: "2012-09-02 14:01:00",
        comment: "Learning new programming languages is hard... it's so easy to forget a </div>!",
        user: new mongoose.Types.ObjectId('57231f1a30e4351f4e9f4bdc'), //jo
        photo_id: new mongoose.Types.ObjectId('57231f1a30e4351f4e9f4bdd') //photo1._id
    },
    //comment2 
    {   
        _id: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4bea"),
        date_time: "2013-09-06 14:02:00",
        comment: "This is another comment, with a bit more text; " +
            "if the text gets long enough, does it wrap properly " +
            "from line to line?",
        user: new mongoose.Types.ObjectId('57231f1a30e4351f4e9f4bdc'), //jo,
        photo_id: new mongoose.Types.ObjectId('57231f1a30e4351f4e9f4bdd') //photo1._id
    },
    //comment3
    {
        _id: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4beb"),
        date_time: "2013-09-08 14:06:00",
        comment: "If you see this text in <b>boldface</b> " +
            "then HTML escaping isn't working properly.",
        user: new mongoose.Types.ObjectId('57231f1a30e4351f4e9f4bdc'), //jo,
        photo_id: new mongoose.Types.ObjectId('57231f1a30e4351f4e9f4bdd') //photo1._id
    },
    //comment4 
    {
        _id: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4bec"),
        date_time: "2009-09-14 18:07:00",
        comment: "If there is one thing the history of evolution has" +
            " taught us it's that life will not be contained. Life breaks " +
            "free, it expands to new territories and crashes through " + 
            "barriers, painfully, maybe even dangerously, but, uh... well, " +
            "there it is. Life finds a way.",
        user: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4bd7"), //im,
        photo_id: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4bde")//photo2._id
    },
    //comment5 
    {
        _id: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4bed"),
        date_time: "2013-11-28 17:45:13",
        comment: "Back from my trip. Did IQs just... drop sharply while I was " +
            "away?",
        user: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4bd8"), //er,
        photo_id: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4be1") //photo5._id
    },
    //comment6
    {
        _id: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4bee"),
        date_time: "2013-11-02 14:07:00",
        comment: "Hey Rey, great form. Love what " +
            "you do with the scavenged tech, got any tips?",
        user: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4bd8"), //er,
        photo_id: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4be3") //photo7._id
    },
    //comment7 
    {
        _id: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4bef"),
        date_time: "2013-11-02 14:07:00",
        comment: "Definitely! I love your work! I'm away on a trip at " +
            "the moment, but let's meet up when I get back! :)",
        user: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4bda"), //rk,
        photo_id: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4be3") //photo7._id
    },
    //comment8
    {
        _id: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4bf0"),
        date_time: "2010-09-06 13:59:33",
        comment: "Made a new friend today! Well, they followed me " + 
            "home, anyway.",
        user: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4bda"), //rk,
        photo_id: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4be4") //photo8._id
    },
    //comment9 
    {
        _id: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4bf1"),
        date_time: "2008-10-16 18:04:55",
        comment: "Wouldn't get anywhere without this beauty! " +
            "Completely built from scraps by hand, but she goes at top " +
            "speeds that'll rival any First Order piece of junk.",
        user: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4bda"), //rk,
        photo_id: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4be8") //photo12._id
    }, 
    //comment10 
    {
        _id: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4bf2"),
        date_time: "2013-12-04 13:12:00",
        comment: "What do you mean you haven't heard of second " + 
            "breakfast?",
        user: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4bd9"), //pt,
        photo_id: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4be6") //photo10._id
    },
    //comment11 
    {
        _id: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4bf3"),
        date_time: "2013-09-04 10:14:32",
        comment: "Beautiful yet cold and aloof. Loner. Does not obey, " + 
            "occasionally chooses to cooperate. ",
        user: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4bdb"), //al,
        photo_id: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4be7") //photo11._id
    },
    //comment12 
    {
        _id: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4bf4"),
        date_time: "2016-01-04 2:00:01",
        comment: "Which one are you?",
        user: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4bdb"), //al,
        photo_id: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4be5") //photo9._id
    },
    //comment13 
    {
        _id: "57231f1a30e4351f4e9f4bf5",
        date_time: "2016-01-04 2:04:01",
        comment: "The tall one.",
        user: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4bd9"), //pt,
        photo_id: new mongoose.Types.ObjectId("57231f1a30e4351f4e9f4be5") //photo9._id
    }
];

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to database');

    await UserModel.deleteMany({});
    await PhotoModel.deleteMany({});
    await CommentModel.deleteMany({});

    await UserModel.insertMany(users);
    await PhotoModel.insertMany(photos);
    await CommentModel.insertMany(comments);

    console.log('Database populated with initial data');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });