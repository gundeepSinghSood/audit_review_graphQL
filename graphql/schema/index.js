const { buildSchema } = require('graphql');

module.exports = buildSchema(`    
    type User {
      _id: ID!
      username: String!
      password: String
      relatedProjects: [Project!]
      toBeReviewed: [Project!]
    }
    
    type Project {
      _id: ID!
      creator: User!
      basicInput: Basic!
      categories: Categories!
    }
    
    type Basic {
      reviewerEmail: String!
      reviewerName: String!
      createdDate: String!
      projectName: String!
      clientName: String!
      phoneNumber: String
    }
    
    type Categories {
      key: String!
      name: String!
    }
    
    type AuthData {
      userId: ID!
      username: String!
      token: String!
      tokenExpire: Int!
    }
    
    input UserInput {
      username: String!
      password: String!
    }
    
    input ProjectInput {
      creatorObjectID: String!
      reviewerObjectID: String!
      basicInput: BasicInput!
    }
    
    input BasicInput {
      reviewerEmail: String!
      reviewerName: String!
      createdDate: String!
      projectName: String!
      clientName: String!
      phoneNumber: String
    }
    
    input UpdatedProjectInput {
      test: String!
    }
    
    input QuestionsByCategoriesInput {
      test: String!
    }
    
    type RootQuery {
      project: [Project!]!
      login(username: String!, password: String!): AuthData!
      getUserByName(username: String!): User!
      getProjecByID(_id: String!): [Project!]!
      getToBeReviwedByUser(_id: [String]): [Project!]
    }
    
    type RootMutation {
      createUser(userInput: UserInput): User
      createProject(projectInput: ProjectInput): Project
      updateProject(updatedProjectInput: UpdatedProjectInput): Project
      createQuestionsByCategories(questionsByCategoriesInput: QuestionsByCategoriesInput): Project
    }
    
    schema {  
      query: RootQuery
      mutation: RootMutation
    }
  `)