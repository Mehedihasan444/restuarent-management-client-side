import { Helmet } from "react-helmet-async";
import H1Tag from "../CustomTags/H1Tag";
import MaxWidth from "../CustomTags/MaxWidth";

const Blog = () => {
  return (
    <MaxWidth >
      <Helmet>
        <title>Blog</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
        <div className="space-y-5 my-10 px-5 text-justify">
            <div className="space-y-3">
        <H1Tag>1. What is One way data binding?</H1Tag>
        <div className="">
          <img
            src="https://handsontable.com/blog/wp-content/uploads/2023/04/image10.png"
            alt=""
            className=""
          />
        </div>

        <p className="">
          One-way means that the binding happens in one direction. In this case,
          changes in the data automatically update the UI, but changes in the UI
          do not automatically update the data. That's why it is referred to as
          one-way data binding. React achieves one-way data binding by using
          state and props.
        </p>
      </div>
      <div className="space-y-3">
        <H1Tag>2. What is NPM in node.js?</H1Tag>
        <div className="">
          <img
            src="https://www.codewithc.com/wp-content/uploads/2017/04/What-is-NPM-in-Node.-Js.jpg.jpg"
            alt=""
            className=""
          />
        </div>

        <p className="">
          In Node.js, NPM stands for "Node Package Manager." It is a package
          manager and dependency management tool that is used to install,
          manage, and share reusable JavaScript libraries and packages. NPM is
          commonly used to manage and distribute third-party packages, making it
          easier for developers to include external code and modules in their
          Node.js applications.
        </p>
      </div>
      <div className="space-y-3">
        <H1Tag>3. Different between Mongodb database vs mySQL database.</H1Tag>
        <div className="">
          <img
            src="https://phoenixnap.com/kb/wp-content/uploads/2021/04/mongodb-vs-mysql-database-structure.png"
            alt=""
            className=""
          />
        </div>

        <p className="">
          MongoDB is a NoSQL database with a flexible, schema-less,
          document-oriented data model, suitable for dynamic and evolving data
          structures. It uses a JSON-like query language, and it excels at
          horizontal scaling. MySQL is a relational database with a structured,
          tabular data model, ideal for traditional applications with
          well-defined schemas. It uses SQL for querying and can be scaled
          vertically or through replication and sharding. It's known for strong
          ACID compliance. The choice depends on your data structure,
          scalability needs, and application requirements.
        </p>
      </div>
        </div>
      
    </MaxWidth>
  );
};

export default Blog;
