import { prisma } from './index';

async function main() {
    // const job = await prisma.jobPosting.create({
    //     data: {
    //         title: "Test engineer",
    //         description: "Just a sample data",
    //         company: "xyz"
    //     }
    // });

    // console.log("job created", job);


}

main()
.catch(error => console.log("Database failed!", error))
.finally(() => prisma.$disconnect());