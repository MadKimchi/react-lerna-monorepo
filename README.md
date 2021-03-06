## Introduction
This repository is a demo UI project in the mono-repository structure using Lerna and Yarn Workspaces to increase code reusability for multiple products with common presentation layers and business logic.

The project structure is inspired by Clean Architecture created by Uncle Bob and others and suggested by Microsoft for its modern .NET application architeture.

NOTE: This project is an ongoing work done daily in the author's spare time. Therefore, it is not a production ready and may contain several bugs. Currently pipelines are not set up and projects are not fully wired up. 

## Project Structure
![application-structure](https://user-images.githubusercontent.com/19801457/76269864-ac3c7780-6249-11ea-84eb-f39cda83ed8b.png)

### 1. Core:
- A package that contains any shared classes, interfaces, enums, and services that are related to business logic and data flow.
- These cannot be directly modified in the children level of the structure but only extended. Core -> Applications is readonly, but Applications -> Core should not be allowed.
- This package is intended to increase code reusability for business logic. Examples can be HttpClients (such as, AuthClient or GraphClient), Contexts, Providers, Models and etc.

### 2. Core-UI:
- A package that defines shared components across all product applications, a.k.a UI Design System.

### 3. Applications
- Applications that consume Core and Core-UI to implement features.
- At this level, Core and Core-UI are readonly but can be extended for customization.

Each package will have its own pipeline for deployment.

## How to build and run
First, you need to run yarn in the root level,
```
yarn
```

### 1. Core:
In root level

**Build**
```
yarn build:core
```
### 2. Core-UI:
In root level

**Build**
```
yarn build:core-ui
```
**Run Storybook**
```
yarn story:core-ui 
```
**Deploy Storybook to gh-pages**
```
yarn deploy:core-ui
```
### 3. Applications:
In the application directory,

**Run**
```
yarn start
```

**Build**
```
yarn build
```
