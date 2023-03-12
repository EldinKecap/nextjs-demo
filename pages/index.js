import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList'
import Head from 'next/head'

function HomePage(props) {

    return <>
    <Head>
        <title>React Meetups</title>
        <meta name='description' content='Brows a huge list of highly active React meetups'/>
    </Head>
    <MeetupList meetups={props.meetups}></MeetupList>
    </>
}




// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;


//     return{
//         props:{
//             meetups:Dummy
//         }
//     }
// }

export async function getStaticProps() {
    // console.log('yo');

    const client = await MongoClient.connect('mongodb+srv://root:root@cluster0.ze2oyhf.mongodb.net/meetups?retryWrites=true&w=majority');

    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

    client.close();

    return {
        props: {
            meetups: meetups.map(meetup => {
                return {
                    title: meetup.title,
                    image: meetup.image,
                    description: meetup.description,
                    address: meetup.address,
                    id: meetup._id.toString()
                }
            })
        },
        revalidate: 1

    };
}

export default HomePage;