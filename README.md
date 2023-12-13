This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).\
The application uses file-system based routing of **Pages Router**. \
The application is deployed in Firebase Hosting so the Nextjs app is converted to a static site using [Static Exports](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports).\
Do not add any [unsupported features](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports#unsupported-features) when developing.

## Getting Started

### Steps to run the application locally

- Clone the repo to your local machine
- 'cd' into the project folder
- In your termianl run: `npm run dev `
- Open [http://localhost:3005](http://localhost:3005) with your browser to see the result.

### Steps to deploy the application to firebase hosting

- Install firebase CLI in your local machine
- Switch to `dev` branch. Fetch all latest changes.
- In your termial run: `npm run build`
- The build process ran successfully, if it doesn't give you any errors and you can see a list of routes at the end. The output is generated in 'out' folder.
- In your termianl run: `firebase login` and make sure you are logged in to your Holland Bloorview guest account.
- In your termianl run: `firebase deploy --only hosting`
- Congratulations!! Your latest changes are deployed.

## Project Structure

The application is divided conceptually in two parts but they share the same structure. One is for clients and another is for clinicians.

### public

- All images used by application is stored here

### src

- context\
  We have used React Context for app wide state managements.

- firebase\
  All the firebase queries are stored here

- pages\
  This folder is used by Nextjs to implement routes. Each subfolder in this folder becomes a route.\
  The sub folder 'client' and 'clinician' spearate routes for client and clinicians respectively.

- scene\
  This folder is defined by us to organize the react component that is used by each page. The folder structure matches the route in pages folder.

- shared\
  Any components that are shared in multiple pages are defined here.

- styles\
  We use [Emotion Styled Components](https://emotion.sh/docs/styled) for styles. This allows us to keep the css part separate from React component and make the code more readable and prevents conflicts with other styles.\
  This folder has styles that are applied globally. Styles for each component is available in `styled.js` next to the component folder.

- utils\
  Utiliy functions used throughout the application.
