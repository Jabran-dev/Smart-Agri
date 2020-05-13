# Smart Agri App

Smart Agri is an application that facilitates the operations of irrigation and fertilization in the development of crops.

## Table of contents

-   [Installing Smart-Agri using a scratch org](#installing-smart-agri-using-a-scratch-org)

-   [Smart Agri Features](#smart-agri-features)

-   [Description of Files and Directories](#Description-of-files-and-directories)

-   [Learning Resources](#learning-resources)

## Installing Smart-Agri using a scratch org

1. Set up your environment. Follow the steps in the [Quick Start: Salesforce DX](https://trailhead.salesforce.com/en/content/learn/projects/quick-start-salesforce-dx/) Trailhead project. The steps include:

    - Enable Dev Hub in your Trailhead Playground
    - Install Salesforce CLI
    - Install Visual Studio Code
    - Install the Visual Studio Code Salesforce extensions

2. If you haven't already done so, authorize your hub org and provide it with an alias (**myhuborg** in the command below):

    ```
    sfdx force:auth:web:login --setdefaultdevhubusername --setalias myhuborg
    ```

3. Clone the repository:

    ```
    git clone https://github.com/[Username]/Smart-Agri.git
    cd smart-agri
    ```

4. Create a scratch org and provide it with an alias (**smart-agri** in the command below):

    ```
    sfdx force:org:create --setdefaultusername --definitionfile config/project-scratch-def.json --setalias smart-agri
    ```

5. Push the app to your scratch org:

    ```
    sfdx force:source:push
    ```

6. Import sample data:

    ```
    sfdx force:data:tree:import --plan ./data/data-plan.json
    ```


7. Open the scratch org:

    ```
    sfdx force:org:open
    ```

8. In App Launcher, select the **Smart Agri** app.

## Smart Agri Features

## Description of Files and Directories

-   **config/project-scratch-def.json:** This file define the shape of scratch org. This will create an org for development and testing.
-   **data:** The data directory contains the csv files used for adding data to scratch org. The csv files have data of fertilization and irrigation planners
-   **force-app:** This directory includes the source of Smart-Agri web application.
-   **sfdx-project.json:** This file contains the configurations of package. 

## Learning Resources