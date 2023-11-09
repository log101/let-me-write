<a href="https://letmewrite.vercel.app/">
  <img alt="Project cover photo" src="assets/images/let-me-write-cover.webp">
  <h1 align="center">Let Me Write</h1>
</a>

<p align="center">
  Let Me Write, leveraging LLM models, let's you write along best writers as if you are the author! Check out the <a href="https://letmewrite.vercel.app/">demo!</a>
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#model-providers"><strong>Model Providers</strong></a> ·
  <a href="#running-locally"><strong>Running locally</strong></a> ·
  <a href="#authors"><strong>Authors</strong></a>
</p>
<br/>

## Features

- Selecting literary excerpts.
- Auto review of writings user entered.
- Review history with Vercel KV (to be replaced soon)
- Auth by Clerk

## Model Providers

This project uses gpt-3.5-turbo by OpenAI, but open source models are to be supported soon.

## Running locally

You have to fill an `.env` file in order to run the app. And unfortunately there are lots of variables. Please put your Clerk key, OpenAI API key and Vercel KV key in it to run the app. Rest is easy.

```bash
pnpm install
pnpm dev
```

## To Do

- [x] i18n support
- [ ] Add Turkish translations +
- [ ] Add a more descriptive introductory welcoming text +
- [ ] Fix sharing feature *
- [ ] Add ability to create classrooms **
- [ ] Add tts *
- [ ] Show the character count +
- [ ] Add confirmation dialog for try again button +
- [ ] Make sidebar always open as in ChatGPT *
- [ ] Show grammatical errors with highlighting **
- [ ] Give better feedback *
- [ ] Let use continue writing after the submission +
- [ ] Ask for users' education on onboarding +
- [ ] Create custom opengraphs +
- [ ] Add a skill tree ***
- [ ] Add write along mode, where you write in turns with AI taking a text as a reference ***

\* Hard
\+ Easy

## Authors

- Furkan Erdem @log101
- You?, Feel free to contribute, check out the issues!
