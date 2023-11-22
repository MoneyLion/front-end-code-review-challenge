# Code Review Challenge

This is a sample repo containing some code to be reviewed by candidates as part of their interview process.

## Scenario

Imagine an early-career engineer on your team proposes this code as a ***prototype*** for your new art search application. It technically meets the product requirements, but the code has ***lots*** of room for improvement. You have plenty of time to rework things, so you can use this code review to asychronously guide and educate your colleague.

## Instructions

1. Clone this repository to your local machine.
2. Create a new private repository on GitHub so others can't copy your work.
3. Push your local clone up to your private repository while preserving history.
4. Create a pull request in your private repo to merge the `feature-art-search` branch into the `main` branch.
5. Add a review of the code, pointing out everything you see could be improved with explanations.
6. Share your private repo with `jeromedane` (or the reviewer(s) requested when you were sent this challenge)

### Details

* This is **not** a typical late stage PR, but an early, naive proposal that needs fixing.
* **Do not worry about being overly critical**. There's a lot to criticize. 
* We're measuring for now well you spot problems, explain their flaws, and what you suggest as alternatives.
* Consider cloning and running the code locally so you can see how it works and test suggested changes.
* This exercise should _probably_ take you 30 minutes to an hour.
* Give feedback for anything dangerous and anything that could be improved.
* Feel free to make any suggestions for code reorganization or alternate approaches.

### Example

The following is an example of something we'd expect to be called out. Rather than parsing query params manually with:

```TypeScript
const queryString = someUrl.slice(someUrl('?') + 1)
const { type } = JSON.parse(
  `{"${queryString.replace(/&/g, '","').replace(/=/g, '":"')}"}`,
  (key, value) => {
    return key === '' ? value : decodeURIComponent(value)
  }
)
```

consider leveraging native APIs like `URLSearchParams`:

```TypeScript
const type = new URLSearchParams(new URL(someUrl).search).get('type')
```

Manually parsing a URL for query params is a solved problem. Doing so manually creates unnecessary complexity, especially using unnecessary regular expressions, making things fragile and harder to maintain.

## Development

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

To run this project locally using the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
