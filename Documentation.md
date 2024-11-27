# Financial Coach Application - Project Documentation

## Overview
This project aims to provide a platform for clients seeking financial coaching by matching them with the right coach based on specific criteria. It features a client-coach matching system, where clients answer a set of predefined questions to help categorize their financial goals and preferences, which are then used to assign them to a suitable coach.

## Key Components
1. **Clients** - Individuals seeking financial coaching.
2. **Coaches** - Professionals offering various types of financial coaching.
3. **Questions** - Predefined questions that help categorize clients based on their needs and goals.
4. **Database** - MongoDB is used to store information about clients, coaches, and questions.

## Coach Configuration

Coaches are configured based on various criteria which allow for an effective match with clients. The following fields are used to define the coach's profile:

### Coach Schema

| Field            | Type        | Description                                                   |
|------------------|-------------|---------------------------------------------------------------|
| `name`           | String      | Name of the coach (Required)                                  |
| `email`          | String      | Unique email address for the coach (Required)                 |
| `password`       | String      | Coach's password (Required)                                   |
| `typeOfCoaching` | String      | Type of financial coaching offered (Required)                |
| `bio`            | String      | Short bio about the coach’s background and expertise          |
| `experience`     | Number      | Number of years of experience the coach has in coaching clients|

### Coach Specialization Configuration
Coaches will specialize in different financial areas. They can be configured with specific types of coaching based on their expertise and the client's needs.

#### Types of Coaching:
1. **General Money Coach** - Focuses on overall financial health and management.
2. **Business Money Coach** - Specializes in helping businesses manage finances.
3. **Investment Coach** - Guides clients in making sound investment decisions.
4. **Behavioral Money Coach** - Focuses on the psychological aspects of money management, helping clients form healthy financial habits.

#### Expertise Areas:
1. **Budgeting and Cash Flow Management**
2. **Debt Management**
3. **Savings and Investing**
4. **Financial Goal Setting**
5. **Financial Literacy Education**
6. **Behavioral Finance and Psychology**
7. **Retirement Planning**

#### Other Coach Preferences:
1. **Ethnicity**: Coaches can specify if they prefer to work with clients of a certain ethnicity or have no preference.
2. **Gender**: Coaches can specify their preferred gender to work with or opt for no preference.
3. **Marital Status**: Coaches may want to work with clients of specific marital statuses.
4. **Number of Children**: Coaches may have preferences regarding clients with children.

## Client Configuration

Clients will answer a set of predefined questions to determine their needs and preferences. Their answers will be used to match them with a suitable coach. Here’s how the client data will be structured:

### Client Schema

| Field                     | Type         | Description                                                    |
|---------------------------|--------------|----------------------------------------------------------------|
| `name`                     | String       | Name of the client (Required)                                  |
| `email`                    | String       | Unique email address of the client (Required)                  |
| `financialGoals`           | String       | Client’s primary financial goal (e.g., Saving, Home ownership) |
| `annualIncome`             | String       | Client’s annual income (Range selection: e.g., below $40,000)  |
| `coveredInCatastrophe`     | Boolean      | Whether the client is covered in case of emergency or lawsuit  |
| `financialSuccess`         | String       | Client’s definition of financial success                       |
| `mainFinancialConcern`     | String       | Client’s main financial concern (e.g., debt, savings, etc.)    |
| `hasBudget`                | Boolean      | Whether the client has a financial budget                      |
| `coachType`                | String       | Type of coach the client is looking for (e.g., Investment Coach)|
| `expertise`                | [String]     | List of expertise the client is looking for (e.g., Budgeting, Debt Management)|
| `ethnicity`                | String       | Preferred ethnicity for the coach (if any)                     |
| `gender`                   | String       | Preferred gender for the coach (if any)                        |
| `maritalStatus`            | String       | Marital status (e.g., married, single, etc.)                   |
| `numberOfChildren`         | Number       | Number of children the client has (if applicable)              |
| `questionAnswers`          | [{question_ID, answerGiven_index}] | Array of answers to the predefined questions |

### Question-Based Categorization

The following questions will be asked to the clients and their answers will be used for categorization:

1. **What financial goals would you like to see first accomplished?**
2. **What is your annual income?**
3. **Are you covered in the event of a catastrophe, emergency, or lawsuit?**
4. **What is your definition of financial success?**
5. **What is your main financial concern?**
6. **Do you have a financial budget?**
7. **What type of coach are you looking for?**
8. **What expertise are you looking for?**
9. **What ethnicity would you like your coach to be?**
10. **What gender would you like your coach to be?**
11. **What is your current marital status?**
12. **How many children are you a parent or guardian for that live in your household?**

### How the Matching System Works

Once a client answers the questions, the following matching system will be used:

1. **Matching Coaches Based on Expertise**: The client’s expertise needs are compared with the coach’s expertise areas. If they match, the coach is considered as a potential match.
   
2. **Matching Based on Coaching Type**: The client’s desired coaching type (e.g., Business Money Coach, Investment Coach) is compared with the available coach's `typeOfCoaching`.

3. **Matching Based on Preferences**: Coaches can specify preferences for ethnicity, gender, marital status, and the number of children. These preferences will be matched with the client’s input.

4. **Coach Availability**: A coach can handle up to 5 clients at a time. Once the coach reaches the limit, they will not be available for new clients.

### How This Will Be Used on the Front-End

1. **Client Signup and Questionnaire**: Clients will be asked to fill out the questionnaire, which will be used to create a profile.
2. **Coach Dashboard**: Coaches will have a dashboard where they can view their current clients and see new client matches. They can filter clients based on their preferences.
3. **Client Dashboard**: Clients will have a dashboard where they can view their assigned coach and their coaching sessions.
4. **Matching Process**: After completing the questionnaire, clients will automatically be matched with a coach based on the criteria defined above.

---

### Example Workflow

1. **Client Creation**:
   - The client fills out the questionnaire.
   - The client is categorized based on their responses.
   - A suitable coach is assigned based on the matching algorithm.

2. **Coach Creation**:
   - A coach fills in their profile (name, experience, coaching type, etc.).
   - The coach is categorized by their expertise.
   - Coaches are listed in the system for clients to be matched.

3. **Client-Coach Interaction**:
   - Once a match is made, the client and coach can begin their coaching sessions.
   - The client is assigned to a coach who can handle up to 5 clients.

### Technologies Used

- **Backend**: Express.js, MongoDB (Mongoose)
- **Frontend**: React.js (or any front-end framework of your choice for creating interactive UIs)
- **Database**: MongoDB (for storing coaches, clients, and questions)
