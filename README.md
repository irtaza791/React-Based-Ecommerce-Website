Abstract

In today’s rapidly evolving digital world, the ecommerce industry has experienced a significant growth. People prefer the convenience and ease of online shopping. However, they must face many challenges such as slow navigation, hard-to-understand interfaces, and a lack of advance features that can enhance the overall shopping experience. This project aims. is to develop an ecommerce website that addresses these challenges. 
The motivation behind creating Elite Equine Solution website his project was to create a user friendly, feature-rich ecommerce. platform that provides an easy shopping experience for customers and management for the administrators. Our primary goals were to improve navigation speed, implement advanced. features such as price tracking and order tracking, and to create an aesthetically pleasing user interface.
Elite Equine Solution offers a range of innovative features including price tracking system, fast and secure order placement and payment, order tracking and many more features. Price tracking allows users to set a target price for products they like but may be out of their price range. When the target price is reached the user receives a notification by email. This can help increase their purchase decisions. The website also offers a fast and secure order placement and payment, and order tracking. With this project we have successfully achieved our goals of creating an enjoyable shopping experience for users while simplifying administrative tasks for website managers
To achieve the following features, we used React a popular JavaScript library known for its performance and flexibility. The website uses Firebase for the backend services which enables efficient data storage, real time updates and secure user authentication. The use of react and firebase allowed rapid development and integration of various components.
In summary, our e-commerce platform highlights the potential of using the React framework and Firebase integration to develop feature-packed, high-performance websites that cater to the ever-changing needs of online shoppers. It offers a practical solution to challenges faced by the e-commerce industry and sets the stage for future innovations in this field. With its great design and features it enables the user to shop online with ease without must spend too much time on slow processing and waiting times.
Chapter 1.  Introduction

1.1	Project Area - Elite Equine Solution

My project is about web development with a focus on ecommerce. In today's world, the newest technologies and ways of creating are always being used in this area. Now, many developers are using things like React and Vue.js for the front-end, and Firebase for the backend. They are also using Material UI to make things look good.

My project, called the Elite Equine Solution, fits into this area as a complete ecommerce platform. It tries to solve common problems like slow website speed, difficult interfaces, and missing advanced features, for example, price and order tracking. This project is different from others because it aims to give a better shopping experience for users and makes the job easier for people managing the website.

The goal of this project is to show that using new technology can make better ecommerce websites. It wants to make things better for customers, easier for administrators, and inspire other people to create new things in the future.

1.2	Goals and benefits of the project

The main goal of my project is to create a better online shopping platform. The project helps customers and administrators by making things fast and secure and by adding useful features.
The benefits of this project are many. For the customer, the website is easy to use, has advanced features like price and order tracking, and a simple interface. For the administrator, it makes managing and monitoring the platform easier.
I decided to make this project because I wanted to solve problems that I saw in other ecommerce websites. I wanted to use the latest technology to make a website that worked well and was easy to use.
Moreover, this project set a new benchmark in the ecommerce industry, demonstrating the potential of using advanced technologies like React , three.js and Firebase to develop high-performance, feature-packed websites. It offered a practical solution to the challenges faced by the ecommerce industry and paved the way for future innovations.
1.3	Overview of approach

The journey to create the Elite Equine Solution platform was an interesting one, which started with identifying the challenges faced by the online shopping community. A simple question was asked - what problems were online shoppers and website administrators experiencing? Once the pain points were understood, the goals and plan for the project were outlined more effectively.
The technology chosen to bring this project to life had to meet criteria of being robust, flexible, and efficient. So, React, a powerful JavaScript library, was decided for the front-end development. The beauty of React lies in its component-based architecture, which allowed for building the platform in a modular way, making it easier to develop and integrate various features like price tracking and order tracking and many more.
For the backend, Firebase was chosen which offers a multitude of tools including data storage, real-time updates and secure user authentication system everything under one platform. Firebase made the development process smoother and simplified the management and monitoring of the platform.







Chapter 2.  Document Structure
Contents
Abstract	1
Chapter 1.  Introduction	2
1.1	Project Area - Elite Equine Solution	2
My project is about web development with a focus on ecommerce. In today's world, the newest technologies and ways of creating are always being used in this area. Now, many developers are using things like React and Vue.js for the front-end, and Firebase for the backend. They are also using Material UI to make things look good.	2
My project, called the Elite Equine Solution, fits into this area as a complete ecommerce platform. It tries to solve common problems like slow website speed, difficult interfaces, and missing advanced features, for example, price and order tracking. This project is different from others because it aims to give a better shopping experience for users and makes the job easier for people managing the website.	2
The goal of this project is to show that using new technology can make better ecommerce websites. It wants to make things better for customers, easier for administrators, and inspire other people to create new things in the future.	2
1.2	Goals and benefits of the project	2
1.3	Overview of approach	3
Chapter 2.  Document Structure	4
Chapter 3.  Literature Review	5
Chapter 4. Methodology	10
Chapter 5.  System Design and Specifications	28
Chapter 6.  Implementation	30
Chapter 7.  Testing and Evaluation	31
Chapter 8.  Issues and Setback	32
Chapter 9.  Conclusion	33
Chapter 10.  References	35






Chapter 3.  Literature Review

Embarking on the Elite Equine Solution project required a significant acquisition of new skills and knowledge. I was entering uncharted territory, and a deep understanding of the involved technologies was crucial. A crucial part of this venture was adopting a learning mindset, enabling me to grasp new concepts, understand various tools, and enhance my tech repertoire.
Initially, the project's front-end development started with vanilla CSS. However, as the project progressed, it became apparent that a more efficient approach was necessary. This need for efficiency led me to leverage library power, which resulted in improved time management, speed, and overall productivity.
React, a highly regarded JavaScript library for building user interfaces, was my selected tool for front-end development. A deep dive into the React ecosystem was required to harness its potential effectively. The official React documentation (React, n.d.) was instrumental in helping me understand the library's nuances, including JSX syntax, components, state management, and lifecycle methods. This understanding ensured that I could build user interfaces that were both performant and aesthetically pleasing.
Building on top of React, I integrated Material UI, a widely used React UI framework. This framework offers a broad range of pre-designed components, thus promoting faster and cleaner development. Mastering Material UI (Material-UI, n.d.) required a solid grasp of its core principles, components, and styling methodologies. This understanding enabled the creation of an intuitive and aesthetically pleasing interface.
In addition to Material UI, React Reveal, a high-performance animation library for React, was another tool I had to learn. This library adds a dash of aesthetic appeal to a website, ensuring a more interactive and engaging user experience (React Reveal, n.d.). My understanding of React Reveal added an extra dimension to the website's user interface, allowing animations to play a vital role in user engagement.
To further augment user experience, I ventured into Three.js, a JavaScript library used to create and display animated 3D computer graphics in a web browser. This exploration helped deepen my understanding of 3D object creation, lighting, animation, among other concepts (Three.js, n.d.). Consequently, it was possible to create a dynamic and immersive 3D environment, taking user engagement to a whole new level.
On the back end, Firebase emerged as a significant resource. Firebase, a Google-developed platform, is popular for creating mobile and web applications. Firebase provides a myriad of services, including data storage, real-time updates, and a secure user authentication system. These services played a significant role in ensuring a smooth back-end operation for the project. Firebase Firestore, a flexible and scalable database, was pivotal for storing and retrieving data in real time. Firebase Storage was crucial for secure file uploads and downloads. The official Firebase documentation (Firebase, n.d.) was a primary resource in this part of my learning journey, allowing for a smooth back-end integration.
In essence, the Elite Equine Solution project was not just about creating an eCommerce platform. It was a learning journey that facilitated a deeper understanding of several libraries, APIs, and services. This continuous learning process was essential to create a competitive and user-friendly eCommerce platform.
Related Works:
There are numerous ecommerce platforms on the internet today, and many of them served as inspiration for my project. Websites like Amazon and eBay, for example, have set the standard for the industry, and it was important to study their design choices and features.
My project shares common features with these websites, such as a user-friendly interface, secure payment options, and order tracking. However, it also has unique features like the price tracking system, 3d product display  which sets it apart. Each of these websites has been referenced and studied to ensure that the project did not stray from the industry standard.
By doing this, I was able to see what the current standard in the industry is and was inspired to build a platform that could match or even surpass it in terms of features and user experience.
I have also seen that very few websites are there which have 3d product display on the website. Which sets my website apart from standard ecommerce websites with simple and boring UI.
References:
React - A JavaScript library for building user interfaces. Retrieved from https://reactjs.org/
Material-UI: A popular React UI framework. Retrieved from https://mui.com/
React Reveal - High performance animation library for React. Retrieved from https://www.react-reveal.com/
Three.js - JavaScript 3D Library. Retrieved from https://threejs.org/
Firebase. Retrieved from https://firebase.google.com/
Methodology
In crafting the Elite Equine Solution, the journey was not a simple one. It was filled with challenges, decision-making, and learning experiences that shaped the final outcome. One of the critical aspects that contributed significantly to the success of the project was the methodology adopted. It was essentially the framework within which all the activities were conducted.
I chose to work with the Software Development Life Cycle (SDLC), a highly esteemed model in the software development industry. This model was vital as it provided a roadmap, a step-by-step guide that laid down the path to follow from the initial idea conception to the final product deployment. The SDLC involves several phases, each with its unique importance. These include the requirement analysis, design, implementation, testing, and maintenance phases.
During the requirement analysis phase, the idea of an eCommerce platform was born, with a vision to provide an immersive user experience characterized by captivating UI and 3D product rendering. This was followed by laying down the specific features I envisioned for the platform. These were:
•	A secure checkout system: This feature was critical to ensure user trust and seamless transactions.
•	Fast navigation: To enhance user experience, fast navigation through the platform was a top priority.
•	An order tracking system: This feature aimed to provide users with real-time updates on their orders' status.
•	A price tracking system: Keeping customers informed about price changes empowers them to make better buying decisions.
•	A feature for adding products to favourites: This was to enhance personalization, allowing users to save items they are interested in.
•	A voice search engine: This was intended to improve accessibility by allowing users to search for products using their voices.
•	A recommendation system: By suggesting products based on users' order history and cart history, the platform could provide a personalized shopping experience.
•	A community feedback system: This feature would promote user engagement and allow continuous improvement based on user feedback.
•	A secure login system and user profile management: Ensuring user data privacy and security was a top priority, and enabling users to create and manage their profiles was part of this.
•	An administrative system: Features for administrators to add, edit, or remove products were planned for efficient platform management.
•	An Android application: To cater to mobile users, a mobile application was part of the initial plan.
•	A responsive design: Ensuring a consistent user experience across different devices was a key goal.
•	Revenue and sales tracking systems: For platform growth and optimization, tracking total revenue, recent orders, daily sales, and product sales was essential.

To implement these features, I had to choose the right technologies. React was chosen for building the user interface due to its efficiency and power. Firestore datastore and cloud storage were preferred for their reliability and real-time update capabilities. Material UI was chosen to leverage its wide array of pre-designed components for faster and cleaner development. Finally, React Reveal was incorporated to add beautiful animations to the interface and enhance user engagement.
Like any other development process, the project journey was not without changes. Originally, the front-end design was done using vanilla CSS. But as the project evolved, it became clear that Material UI would provide a more efficient way to design the UI components, prompting the switch. The theme of the website was another area that saw a major transformation. Initially starting with a bright theme, it was later changed to a balanced mix of dark and light tones, which resonated better with the platform's identity.
The hero section of the website, which initially had a static image and text, was later revamped to host an interactive 3D object, making the website more engaging.
However, not all the initially planned features made it to the final product. Some features like the voice search engine, admin content editing, and the Android application had to be left out due to constraints like time and technical complexities.










Chapter 4. Methodology
The Elite Equine Solution project's development unfolded in a series of stages, each progressively building on the foundation laid by the previous one. The process started with creating a basic layout, which was then followed by developing individual sections of the website.
Stage 1 (Wireframe )
The first stage involved creating a wireframe for the home page, a rudimentary blueprint that represented the skeletal framework of the website. The purpose of this stage was to lay out the structure, functionality, and content of the website without any design details, such as colour, typography, or images. The initial wireframe was quite basic, featuring a hero section and product bars as shown in Figure 1. It adopted a minimalistic approach, focusing on simplicity and functionality.

![image](https://github.com/user-attachments/assets/e7ecc824-8a70-4be3-a5ff-26442d93fed6)

Figure 1

Stage 2 (Initial design implementation)
The wireframe served as a roadmap for the initial design implementation. The hero section was developed first, using vanilla CSS and React components. This section, as shown in Figure 2, conformed to a design common to most eCommerce sites - a hero section centrally aligned text and a call-to-action button redirecting to the products page.
The next step was developing the 'Flash Deals' section. This section, as displayed in Figure 3, showcased around 10-15 specially priced products in a scrollable slider. The slider could be navigated using scroll or the left and right buttons, allowing users to browse through the featured deals.

![image](https://github.com/user-attachments/assets/91f6c0ba-f1f3-4660-9aa5-6c51b6a735cd)
 
Figure 2

![image](https://github.com/user-attachments/assets/21c1db65-663c-4dee-84a8-d60071c7ec9d)
 
Figure 3


Stage 3 (More Sections)
With the hero and flash deals sections in place, the next stage was developing the 'Featured Collection' section. This section was designed to present products to users in a visually appealing manner. As shown in Figure 4, this design incorporated a fading animation triggered by scrolling. When users scrolled to this section, the animation was activated, gradually revealing the section for an added element of surprise and engagement.
 
![image](https://github.com/user-attachments/assets/b3db0cda-6955-497e-9c36-b44f62d54662)
Figure 4
This progressive development approach allowed for iterative refinement, with each stage being built and evaluated before moving on to the next. The result was a meticulously designed and user-friendly eCommerce platform that offers a great user experience.






Stage 4 (Products)
The subsequent stage in the project was the integration of products into the eCommerce platform. Given the scope of the project and the number of products to be included, this was a crucial step that required careful planning and execution.
Initially, the products were stored locally in the project structure. JavaScript was employed to create objects for each product, rendering them on the 'All Products' page. This preliminary product page design, as seen in Figure 5, was relatively basic, with the primary focus being on functionality rather than aesthetics.
The 'All Products' page was designed to serve as a comprehensive display of the entire range of products offered by the store. It included a search bar and filter bar, providing users the ability to sort and filter products according to their needs and preferences.
This stage was a significant one as it marked the transition from a skeleton structure of the website to a more fleshed-out version. It paved the way for more intricate designs and functionality improvements in subsequent stages.

![image](https://github.com/user-attachments/assets/7b9556a3-f542-445c-a36a-e48daa30e895)
 
Figure 5
As the project advanced, the inclusion of products transitioned from local storage to Firebase Firestore. Firestore provided a more scalable and efficient solution for storing and retrieving product data, which became more apparent as the number of products and user interactions increased. The decision to switch to Firestore was part of the iterative development process, a hallmark of the Software Development Life Cycle (SDLC) approach adopted for this project.
Stage 5 (Task Management)
Effective project management is an integral part of the development process, especially in large projects like the Elite Equine Solution platform. It not only helps to keep track of the project's progress but also provides a clear picture of the remaining tasks, enabling efficient planning and resource allocation.
In this stage, I turned to monday.com, an online task management tool widely recognised for its intuitive interface and robust features. As depicted in Figure 6, I created a task list outlining all the necessary steps and sub-tasks needed to bring the project to fruition.
These tasks ranged from primary development tasks, such as front-end design and back-end integration, to more specific ones, like 3D product rendering and Firebase Fire store implementation. Each task was documented with a set status, and the platform allowed me to monitor their progress effectively.
The use of monday.com proved to be invaluable in keeping me organised and on track with my project goals. It provided a visual representation of the project timeline, making it easier to identify bottlenecks or delays and adjust the plan accordingly.

![image](https://github.com/user-attachments/assets/b1195723-c7c0-4252-af31-1bc73149966f)
 
Figure 6
Stage 6 (Firestore Datastore Integration and Bulk Upload)
The sixth stage involved migrating product information from local storage to an online database using Firestore Datastore. This was a crucial step as it provided a secure, scalable, and accessible solution for storing and retrieving product data.
Firstly, I had to create an Admin section where the store owner can upload the products to the online database. In conventional eCommerce platforms, administrators typically must upload products individually, manually entering product details. This process can be laborious and time-consuming, particularly when dealing with many products.
To alleviate this issue and streamline the uploading process, I implemented a method that allowed bulk product uploads. With this new feature, an administrator can add hundreds of products simultaneously by filling out a CSV file and uploading it to the website. The structure of this CSV file, as shown in Figure 7, is designed to include essential product details such as product name, description, price, and image URL.
Upon uploading the CSV file, the website automatically parses the file, validates the data, and adds the products to the Firestore Datastore. This feature drastically reduces the time and effort needed to update the product inventory and ensures the process is efficient and error-free.

![image](https://github.com/user-attachments/assets/c0c5f8f9-860c-4601-97b1-59e7cf4f229d)
 
Figure 7
This stage of the project was significant as it introduced a more robust and flexible solution for data storage and manipulation. Moreover, the bulk upload feature added a layer of convenience and efficiency for the store admin, redefining how product information is managed in the system.
This enhancement demonstrated the potential of leveraging advanced data management systems like Firestore Datastore and their practical applications in enhancing user experience and system efficiency. The move towards an online database was a strategic step towards ensuring the scalability and longevity of the Elite Equine Solution platform.
Stage 7 (User Registration and Admin Access)
The seventh stage was centred around user management, specifically, user registration and administrator access.
For user registration, I utilized Firebase Authentication, a service that provides backend services to authenticate users. It handles tasks like hashing and salting passwords securely and validating email addresses, which saved significant development time. I integrated Firebase Authentication with the website, enabling new users to create an account and existing users to log in securely.
One key feature I implemented was unique user identification (UID). When a user registers or logs in, Firebase Authentication provides a unique ID for that user. I fetched and stored this UID in the Firestore Datastore for user management and personalized experiences.
Moreover, I implemented an admin identification feature using the UID. To test this, I registered a user, obtained its UID, and designated this UID as an admin UID. The admin UID was utilized to distinguish an admin from regular users, offering different access levels and functionalities. A user with an admin UID has access to administrative functionalities, such as adding, editing, and removing products, while regular users do not have these permissions.
Figure 7 shows the user registration interface, and Figure 9 shows the admin dashboard, which is only accessible by users with admin UID.

![image](https://github.com/user-attachments/assets/0fb625f9-d6d8-44e5-83e0-0aaeff5d8022)
 
Figure 8
Stage 8 (User Functionalities - Cart System)
The eighth stage was focused on creating user functionalities. With registered users and uploaded products now in place, the platform needed features that would allow users to interact with the products and perform various actions.
The user dashboard was developed to be the hub of these interactions. The dashboard comprised several menus, such as user orders, cart items, favourite items, profile page, and price targets. At this point, while the menus were displayed on the dashboard, not all were functional. The first one I brought to life was the cart system, a crucial component of any eCommerce site. The cart system allowed users to add products to their cart, providing a centralized place to review selected items before proceeding to checkout. Each product card on the website was equipped with an 'Add to Cart' button, which, when clicked, would add the product to the user's cart.
From a technical standpoint, the cart system was created using Firebase's Firestore Datastore. When a user registers on the site, a new collection is created in Firestore, representing the user. This collection contains several subcollections: orders, cart, favourite items, and price targets. Each user, identified by their unique UID, has these collections. This design allows each user to have a personalized experience on the platform, with their own cart, favourite items, and more.
Figure 8 illustrates the process of adding a product to the cart, and Figure 11 shows a user's cart with several items.

![image](https://github.com/user-attachments/assets/8e715caf-e776-406d-898e-fd819c53d7c2)

Figure 9
While the cart system catered to registered users of the platform, it was also essential to accommodate guests or users who did not wish to create an account. I had to ensure that their shopping experience was smooth and intuitive.
For this purpose, a guest user cart system was developed. This system leveraged the power of local storage in a user's web browser to store the products they added to their cart. If a guest user decided to check out, they would be prompted to create an account. Upon successful account creation, the items previously stored in the local storage would automatically transfer to the user's cart collection in the database.

Stage 9 (User Functionalities – Order and Checkout System)
The next step was to create an order placement and checkout system. This was exclusively for authenticated users who had created an account with the platform. As the focus of this project was not to create a full-fledged ecommerce platform with real-time payment processing, a simplified checkout system was implemented.
The checkout system captured user details and fetched the products from the user's cart, enabling them to place an order. It was designed to be intuitive, user-friendly, and straightforward, providing an efficient and seamless checkout experience for our users. As depicted in Figure 10, the checkout interface was created keeping in mind simplicity and ease-of-use.

![image](https://github.com/user-attachments/assets/6cd23c90-d82b-4eef-acc7-858028c42a22)
 
Figure 10
Once an order was placed, users could view their order history in the "Orders" section of their user dashboard or on their profile page. The reason behind this is the system's design - the user's order history is stored in their personal database. It retains all the orders they have placed with us, providing a transparent and easy-to-follow history of their transactions. This step in the development process played a pivotal role in shaping the user experience on the platform. Not only did it provide users with the ability to make purchases, but it also allowed them to keep track of their orders, enhancing transparency and trust between the platform and its users. This, in turn, would encourage continued engagement with the platform, bolstering its potential for success.
The order placement and checkout system were a crucial milestone in the development process, bringing us one step closer to having a functioning, user-friendly ecommerce platform. It highlighted the importance of simplicity, transparency, and user engagement in creating an effective ecommerce platform, and set the stage for the remaining stages of the development process.
Stage 10 (Adding Favourites)
The subsequent stage was to improve the user experience by adding functionality that allowed users to mark their favourite items. Often, customers browse through multiple products and identify certain items that they might want to purchase at a later time. The 'favourites' feature was implemented to cater to this need. It provided a straightforward and convenient way for users to save and easily access the items they were most interested in.

This feature was enabled through a simple heart icon located on each product. Users could click on this icon, marking the item as a 'favourite.' The selected item would then be added to the 'favourites' collection in the user's personal database. Figure 11 illustrates the heart icon used to add items to favourites.

![image](https://github.com/user-attachments/assets/5642e1fd-579d-4510-991d-64615e9dd2bc)

Figure 11
This feature, while seemingly simple, significantly improved the user experience. It provided users with a level of personalization and engagement, reinforcing their connection with the platform. It also served as a tool to encourage return visits, as users would have a ready list of items they were interested in and might want to revisit.
In conclusion, the 'favourites' feature was an important addition to the platform. It not only enhanced user experience but also helped promote user engagement and retention, contributing to the platform's overall success. This marked another critical milestone in the development process, demonstrating the importance of personalization in ecommerce platforms.








Stage 11 (Price Target Feature)

The following phase of development focused on a more advanced feature aimed at providing a value-added service for the users - the price target feature. This feature was born out of an understanding of how customers interact with ecommerce platforms, particularly when it comes to pricing. Often, users come across items they desire, but the current price might be beyond their budget. The price target feature was developed to address this scenario. The implementation was straightforward. Each product page was equipped with a 'Set Price Target' button, which, when clicked, allowed users to set their desired price for the item. This information, along with the product details, was stored in a dedicated collection in the user's personal database. This process can be visualized in Figure 12.

![image](https://github.com/user-attachments/assets/3631e859-921b-4d01-8ca1-2e234d537701)

Figure 12
 
Within the user's dashboard, there was a specific menu for 'Price Targets.' This menu displayed all the items for which the user had set a price target. More importantly, if the actual price of a product matched the target price set by the user, that product was highlighted. This dynamic functionality can be observed in Figure 13.

 ![image](https://github.com/user-attachments/assets/b6ea1b35-81cb-4020-884c-0fca7b8a3df8)

Figure 13
This feature provided users with a level of engagement and personalization that went beyond the typical ecommerce experience. It allowed users to feel more in control of their shopping experience and helped them engage more deeply with the platform. It also incentivized users to return to the platform to monitor the prices of their desired items.
The price target feature represented another significant step in the development process. It demonstrated how customer-centric features could enhance user engagement and satisfaction, contributing to the success of the platform. This stage once again underscored the importance of understanding user behaviour and needs in the development of a successful ecommerce platform.











Stage 12 (Profile and Personalization)
Another aspect of an eCommerce platform that contributes to its user-friendliness and user engagement is personalization. Understanding the need for this, the next stage of the development process focused on creating a personal profile page for each user. This profile page, accessible from the user's dashboard, serves as a personal space for the user on the platform. The interface of the profile page is illustrated in Figure 14.

 ![image](https://github.com/user-attachments/assets/3908aeb6-5747-440b-83fa-cf1e34974add)

Figure 14
The profile page allows users to store and edit personal details such as their name, email, gender, and address. This information helps in tailoring a personalized shopping experience for the user, enhancing their engagement with the platform. Moreover, having the user's address stored eliminates the need for inputting this information at every checkout, making the process more efficient and less time-consuming.
In addition to the personal detail editing feature, the profile page also provides a summary view of the user's history. The user's past interactions with the platform, such as order history and price targets, are displayed here, providing the user with a quick and easy access point to review their activities on the platform.
This stage of development emphasized the importance of personalization in an eCommerce platform. Giving users the ability to manage their personal details and providing them a view of their interactions with the platform can significantly enhance user experience. It gives them a sense of ownership and control over their shopping journey, fostering higher engagement levels and, consequently, contributing to the platform's success.
Stage 13 (Community Feedback and Rating)
In the pursuit of continuously improving the platform and catering to the needs of the users more effectively, the next stage of development was dedicated to establishing a community feedback forum. This forum serves as a platform for registered users to express their opinions, provide feedback, and rate the shop based on their experiences. This feedback mechanism is illustrated in Figure 15.
 
 ![image](https://github.com/user-attachments/assets/c0fe0a6e-2031-4f34-8a9f-090ed8aba2e6)

Figure 15
The community feedback forum encourages user participation and promotes a sense of community among the users. It offers a channel for users to express their thoughts and voice any concerns, while the star rating system provides a quantifiable measure of user satisfaction. By taking the time to review and rate the platform, users indirectly contribute to its development and improvement.
Notably, this feature is exclusive to registered users. While guest users have the liberty to read through the feedback and ratings, they are not allowed to provide feedback or rate the platform. This exclusivity has a twofold purpose - it encourages guest users to register and become a part of the community, and it ensures the integrity and authenticity of the feedback and ratings, as they come from verified users.
In essence, the community feedback forum is a valuable tool for understanding user sentiments and improving the platform accordingly. It provides insights into the user's experience and preferences, thereby guiding the continuous development and refinement of the platform. This iterative approach, where user feedback is regularly considered, is crucial in maintaining the platform's relevance and enhancing user satisfaction over time.




Stage 14 (Admin Dashboard and Functionalities)
The next step in the project was to cater to the administrative side of the platform. The Admin Dashboard was constructed to provide the administrators with comprehensive tools to manage the website efficiently. This phase of the project development focused on building administrative functionalities and features, including an extensive Admin Dashboard, Analytics, Add Products, Edit Store, and Edit Products features, as explained below:
Admin Dashboard: This is the primary interface that an admin sees upon logging in. It provides a snapshot of the ecommerce platform's performance. The dashboard displays crucial data such as total revenue generated, total orders placed, average order value, the sales trend for the whole year, and all pending orders that need fulfilment. This central control panel is designed to aid admins in their decision-making process and offer a quick overview of the platform's status, as shown in Figure 16.

 ![image](https://github.com/user-attachments/assets/ee9013cc-4469-4eec-96de-b662e400ada3)

Figure 16
Analytics: This section provides the admin with detailed insights into the platform's performance. It includes metrics such as daily sales, daily orders, and data about the most and least ordered products. These analytics offer a deeper understanding of the platform's operation, helping the admin identify trends, make informed decisions, and implement effective strategies for improvement.
Add Products: This feature empowers the admin to add new products to the shop in bulk. This is accomplished through a CSV file upload, allowing the admin to add multiple products at once, significantly reducing the time and effort required for product uploads.
Edit Products: This functionality gives the admin the ability to modify the details of the products listed on the platform. Admins have access to all the products in the shop and can change the product's price, name, or photo, or even remove the product upon confirmation. This feature ensures that the product listings remain up-to-date and relevant.
Edit Store: Although it has not been fully implemented at this stage, the Edit Store feature is planned to offer admins the ability to adjust the store's look and feel, tweak settings, and manage various store-related aspects.
These advanced admin features are designed to offer a high level of control over the platform's operation. They equip admins with the tools they need to manage the ecommerce platform effectively, ultimately ensuring an excellent shopping experience for the users. The development of these features marks a significant milestone in the project, enabling a robust and efficient platform management mechanism.


 ![image](https://github.com/user-attachments/assets/667d60c7-991f-452b-8505-c3f22411f34f)

Figure 17













Stage 15 (Frontend Development and Redesign)
The project then transitioned to a vital phase focused on revamping the frontend, enhancing the visual appeal, and optimizing the user interface. The original CSS was entirely replaced with Material UI, a popular React UI framework, to provide a more modern, consistent, and responsive interface. In addition, React Reveal was incorporated to introduce smooth and attractive animations, adding a layer of dynamism to the platform's presentation. One of the significant changes in this stage was the complete transformation of the hero section. Originally, it featured a simple design with a static image and text. Recognizing the need to make the website more engaging and align better with the brand's identity, a decision was made to implement a 3D rendering solution using Three.js. This JavaScript library allowed for the creation and display of 3D graphics in a web browser.
In line with the brand's identity as a provider of horse-riding equipment, a 3D model of a horse was incorporated into the hero section. The horse model, echoing the brand's logo, was set to rotate on a canvas, thereby creating an immersive and interactive visual experience for the users right from the homepage. The addition of the 3D model not only enhances the aesthetic appeal but also adds a unique and engaging element to the website, setting it apart from standard e-commerce sites. In the future, there is potential for incorporating more sophisticated 3D models, further elevating the website's appeal and immersive experience. It's essential to mention that while the integration of Material UI, React Reveal, and Three.js demanded additional effort, the payoff in terms of the site's responsiveness, speed, and overall visual appeal was tremendous. The redesigned website now boasts a visually stunning interface that is intuitive, engaging, and fast-paced, ensuring a seamless and enjoyable shopping experience for users.
This phase of the project underlines the importance of striking a balance between functional efficiency and aesthetic appeal in creating an e-commerce platform. An engaging and user-friendly interface significantly contributes to the platform's success by fostering user satisfaction and driving user engagement. Figure 18 illustrates the new hero section with the 3D model of a horse.

 ![image](https://github.com/user-attachments/assets/f7c51bd4-bf13-41ba-a463-9466b5df6dd4)

Figure 18
Overall, the project's redesign stage embodied a significant transformation, enhancing the platform's frontend, refining the user experience, and aligning the visual presentation more closely with the brand's identity. This phase marked a crucial point in the development process, setting the stage for subsequent steps and laying a strong foundation for the platform's success.



























Chapter 5.  System Design and Specifications

System Design and Specifications
To realize the vision of the project, meticulous planning and design went into deciding how to build the eCommerce platform. This involved determining the suitable technologies, languages, libraries, APIs, backend and frontend design, database structure, system models, and hardware and software requirements.
Technologies, Languages, Libraries, and APIs:
For the project, we used a combination of cutting-edge technologies to ensure robustness, speed, and efficiency.
•	React.js: We opted for React.js, a popular JavaScript library, for developing the user interface due to its efficiency, flexibility, and strong community support.
•	Firestore Datastore: Firestore was selected as the primary database due to its real-time capabilities, scalability, and seamless integration with other Google services.
•	Cloud Storage: We used Google Cloud Storage for storing and serving user-generated content such as product images.
•	Material UI: This was used for frontend design to ensure responsiveness, a modern look, and a consistent theme across the website.
•	React Reveal: This library was used to introduce attractive animations to the platform.
•	Three.js: This was used for 3D rendering in the hero section, adding a unique and interactive element to the site.
•	Firebase Authentication: We used Firebase Authentication for user registration and managing user sessions.
•	Monday.com: This project management tool was used for task tracking and progress management.
Backend Design and Frontend Design:
The backend design primarily revolved around Firestore for database management and Firebase Authentication for user handling. We ensured a seamless interaction between the backend and frontend through well-defined APIs and data structures.
The frontend was designed using React.js, Material UI, and React Reveal. This choice ensured a fast, dynamic, and aesthetically pleasing user interface.
Database Structure:
The database was designed around Firestore's NoSQL structure. It includes collections for users, products, orders, and feedback. Each user collection contains subcollections for orders, cart, favorite items, and price targets. This structure allows easy scaling and efficient data retrieval.

System Models:
The system was developed based on the Software Development Life Cycle (SDLC) model, which provides a structured and organized approach to software development.
Hardware and Software Requirements:
Software Requirements: A modern web browser (like Google Chrome, Firefox, Safari) and an internet connection are required to access the website.
Hardware Requirements: There are no specific hardware requirements. As a web application, the platform can be accessed from any device – a desktop computer, laptop, tablet, or smartphone – with internet connectivity.

In conclusion, the chosen technologies and system design helped realize a scalable and efficient eCommerce platform with a visually engaging and user-friendly interface. The use of React.js, Firestore, and other modern technologies ensured the system's robustness and adaptability, setting the stage for future enhancements.





















Chapter 6.  Implementation

The implementation stage focused on bringing the proposed design and planned features to life, resulting in a fully functional, interactive eCommerce platform. This section will take a deep dive into the features that made it to the end and the current state of the project.
The primary features included:
Ecommerce Platform: The website serves as a full-fledged eCommerce platform that facilitates browsing of various products, adding them to a cart, and placing orders. Users can view product details, select their desired items, and proceed to a secure checkout.
User Authentication and Profile Management: The platform features a robust user authentication system implemented using Firebase Authentication. Once registered, users can create, view, and edit their profiles, which include their name, email, address, and gender.
Interactive User Dashboard: Authenticated users have access to a personalized dashboard. Here, they can track their orders, manage their cart, view their favourite items, set price targets for specific products, and view their order history.
Admin Dashboard: Admins have a specialized dashboard from which they can manage the eCommerce platform. This includes tracking total revenue, monitoring daily sales, adding or editing products using a CSV file, and managing store content.
Community Feedback: Users can leave feedback about their experiences, rate products, and engage in community discussions. This not only increases user engagement but also provides valuable insights to the admin for continuous improvement.
Advanced UI Features: The site boasts advanced UI features such as 3D rendering using Three.js in the hero section, engaging animations with React Reveal, and a responsive and aesthetic design using Material UI.








Chapter 7.  Testing and Evaluation

User Testing: A variety of users were invited to interact with the platform, providing invaluable feedback about the user experience. This included both experienced and novice users, who were asked to perform tasks and rate their ease of completion.

Performance Testing: To ensure that the website could handle multiple concurrent users and large data loads, performance testing was conducted. Also the website was able to run smoothly in different devices with low power and high power. And also the website is responsive for different screen sizes.
As we can see in the figure 19 below a mobile version of the website is visible.

![image](https://github.com/user-attachments/assets/2ad57094-130a-4307-b888-60ec140debd2)

Figure 19



Chapter 8.  Issues and Setback
Developing a complex ecommerce website project with multiple functionalities and using advanced technologies came with its own set of challenges. The project was a substantial learning process, and as with any significant endeavour, there were various issues and setbacks encountered along the way.
Learning and Development
One of the largest issues faced was the steep learning curve associated with the technologies employed in this project. Learning new technologies while simultaneously applying them to a complex project posed a significant challenge. This was particularly true for using JavaScript, React, Firebase, Material-UI, and Three.js. Each of these has its own complex set of concepts to grasp and methods to master. As a result, the project's development pace was often slowed as more time was needed to understand and implement these technologies effectively.
Switching Design Frameworks
Another significant issue encountered was the transition from using CSS to Material-UI for designing the website. While CSS is flexible and customizable, it was decided that Material-UI, a React UI framework, would be more beneficial due to its efficiency and pre-designed components that are easy to implement and customize. This decision, while ultimately beneficial, required learning a new design framework, reworking existing CSS designs, and implementing Material-UI across the site. This process took additional time and resources, resulting in a delay in the project timeline.
Datastore Connection and Algorithmic Challenges
Establishing a connection to Firestore datastore and creating a seamless flow of data across the application was another substantial challenge. Connecting the front-end of the website with the back-end Firestore datastore required an in-depth understanding of how data is fetched, updated, and managed.
Moreover, implementing algorithms for shopping cart functionalities and price target features proved to be particularly complex. These algorithms were vital for the application's ecommerce capabilities, allowing users to add products to their carts and set price targets. Creating these algorithms required intricate logic and thorough testing to ensure they worked seamlessly, thus adding complexity to the development process.
These setbacks, while challenging, served as valuable lessons and provided an opportunity for significant learning and growth. They highlighted the importance of planning, adaptability, continuous learning, and thorough testing in any development process. Despite these challenges, the commitment to developing a robust ecommerce site never wavered, and each hurdle overcome contributed to the growth and success of the project.




Chapter 9.  Conclusion

Conclusion
This project was all about creating an online shopping website. We included a lot of cool features to make shopping easy and fun. We started with a basic design, but then added things like a way for users to sign up, search for products, place orders, leave feedback, and more. We also made sure there was a special section for the person running the shop. Here, they can see how sales are going, add new products, and make changes to the shop as needed.
Working on this project was a great learning experience. We used a lot of modern web tools like React, Firebase, Material UI, and Three.js. These tools helped us build a really neat website that not only looks good but also works really well.
One important thing we learned from this project is how much good design matters. The way a website looks and how easy it is to use can really affect how people feel about it. That's why we made sure to take feedback from users seriously and used it to make our website even better.
Looking back, we realized that it would have been good to do more testing early on. Catching problems right away would have made the project go more smoothly and saved us time fixing things later. But, this was a lesson learned and something we will definitely keep in mind for future projects.
Another thing we learned is that it's okay to make changes along the way. For example, we decided to switch to different tools for designing the website partway through the project. This was a big job, but it made the website look better and work faster. We also added a 3D image to the homepage, which makes the website really stand out.
In the end, this project was a success. We met our goals and learned a lot along the way. Plus, we ended up with a really cool online shop that's easy to use and fun to shop at. If we had to do this project again, we'd be even better prepared and could probably make the website even more amazing.









Future Work
If we had more time and access to better resources, there's a lot more we could add to the website to enhance its functionality and overall user experience.
•	Advanced User Personalization: With more time, we would like to build a more advanced user personalization system. This could include personalized product recommendations based on the user's past purchases or browsing history.
•	Payment Gateway Integration: We could integrate actual payment gateways for real-time transactions. Currently, our website uses a simple checkout system, but we could add options for users to make payments directly through credit/debit cards, mobile wallets, or bank transfers.
•	Integration with Logistics Providers: We could implement a feature for real-time tracking of orders, collaborating with courier or logistics companies for streamlined delivery processes.
•	Enhanced Security: While our current setup utilizes Firebase Authentication for user security, there's always room for improvement in this domain. With better tools, we could add additional layers of security, like two-factor authentication, to ensure even more robust protection for our users' data.
•	Improved AI/ML Algorithms: Machine learning algorithms could be used to predict user preferences, provide smarter product suggestions, predict trends, and even automate certain administrative tasks.
•	Multilingual Support: Given enough time, adding support for multiple languages could help us reach a broader global audience, enhancing the inclusivity and accessibility of our platform.
•	Virtual Reality (VR): With better tools like powerful rendering software or VR development kits, we could implement VR shopping experiences. Imagine being able to visualize products in a virtual space – that's a potential game-changer!
•	Mobile Application: We would also develop a mobile application for both iOS and Android platforms, complementing the website to ensure accessibility across all devices.

Our vision for the future of this online shop is quite ambitious, but we believe that with more time and resources, all of these enhancements could become a reality. They would not only improve the user experience but also give us an edge over competitors, driving growth and ensuring sustainability in the long run.





Chapter 10.  References

1.	Firebase. (2023). Firebase Documentation. Retrieved from: https://firebase.google.com/docs
2.	Material-UI. (2023). Material-UI: A popular React UI framework. Retrieved from: https://material-ui.com/
3.	ReactJS. (2023). React – A JavaScript library for building user interfaces. Retrieved from: https://reactjs.org/
4.	Three.js. (2023). Three.js - JavaScript 3D library. Retrieved from: https://threejs.org/
5.	Cloud Firestore. (2023). Firestore documentation. Retrieved from: https://firebase.google.com/docs/firestore
6.	Monday.com. (2023). Monday - Work Management and Productivity Software. Retrieved from: https://monday.com/
7.	React-Reveal (2023). Animation Framework for React. https://www.react-reveal.com/docs/
8.	SketchFab.(2023). For 3d models .https://sketchfab.com/features/free-3d-models

