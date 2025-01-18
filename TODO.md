# TODOS

- [X] Add API presenter
- [X] Set up Github actions
  - [X] Unit tests
  - [X] TypeScript compiler (Next.js build)
  - [X] Add test coverage
- [X] Make test coverage 100% (when possible)
- [X] Add environment variables guard function
- [X] Deploy to Vercel preview and production
- [X] Create endpoint `GET /animals`
- [X] Create `preview` environment to GitHub repository
  - [X] Update `preview.yml` to use `preview` environment
  - [X] Delete `development` environment from GitHub repository
- [X] Create pagination to `GET /animals`
- [X] Create filter to `GET /animals` by property
- [X] Create pagination `totalPageItems` counting the itens for that page
- [X] Add ChatGPT suggestions for improvement for the task above
- [X] Create get animal by id `GET /animals/:id`
- [X] Fix deployment to vercel: wait for GitHub Actions to finish before deploy
- [X] Fix production deployment failing
- [X] Fix: GitHub Actions to be triggered only when the branch Pull Request is created
- [X] Check why GitHub Actions is requiring approval on each job for production
- [X] Add problem+json error
- [WIP] Global Http Error Handling
- [ ] Improve CreateAnimalValidationError & ProblemDetailError logging

- [ ] Improve `README.md`
- [ ] Add linting to CI
- [ ] Update vercel envs with GitHub Actions envs (vercel CLI: `vercel env`)
