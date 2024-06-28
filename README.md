# Pokedex Application

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)

## Introduction
The Pokedex Application is a React-based project that allows users to browse and catch Pokémon. Users can view details of each Pokémon, attempt to catch them, and see their caught Pokémon in a favorites sidebar. The application integrates with the PokeAPI to fetch Pokémon data.

## Features
- Browse a list of Pokémon with pagination.
- View detailed information about each Pokémon.
- Attempt to catch Pokémon with a 50% success rate.
- Limit of two catch attempts per Pokémon.
- Store caught Pokémon in local storage as favorites.
- Remove Pokémon from the favorites list.
- Filter the favorites list by name or by type.
- Responsive design for different screen sizes.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/Pokedex.git
   cd Pokedex
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
    ```bash
    npm run dev
    ```

## Usage

- Open your browser and navigate to [http://localhost:5173](http://localhost:5173).
- Browse the list of Pokémon.
- Click on a Pokémon card to view its details.
- Attempt to catch the Pokémon. Note that you have a maximum of two attempts per Pokémon.
- View your caught Pokémon in the favorites sidebar.
- Remove a Pokémon from the favorites list using the remove button.
- Filter the favorites list by name or by type using the search bar or the type dropdown.
