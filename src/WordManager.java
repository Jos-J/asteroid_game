package src;

import java.util.List;
import java.util.ArrayList;
import java.util.Random;
import java.util.Arrays;
import java.io.*;
import java.awt.Graphics;


public class WordManager {
    private List<WordAsteroid> asteroids = new ArrayList<>();
    private Random random = new Random();
    private List<String> wordList = new ArrayList<>();

    private int spawnTimer = 0;
    private int spawnDelay = 120; // frames (~2 sec at 60fps)

    public WordManager() {
        // Load words from file
        try (BufferedReader br = new BufferedReader(new FileReader("./assets/words.txt"))) {
            String line;
            while ((line = br.readLine()) != null) {
                line = line.trim();
                if (!line.isEmpty()) wordList.add(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Fallback if file fails
        if (wordList.isEmpty()) {
            wordList.addAll(Arrays.asList("java", "asteroid", "game", "typing", "panel"));
        }
    }

    // Update all asteroids and spawn new ones
    public void update(int panelWidth, int panelHeight) {
        spawnTimer++;

        // Spawn new asteroid
        if (spawnTimer >= spawnDelay) {
            spawnTimer = 0;
            String word = wordList.get(random.nextInt(wordList.size()));
            int x = random.nextInt(panelWidth - 100);
            asteroids.add(new WordAsteroid(word, x, 0, 2));
        }

        // Update all asteroids
        for (WordAsteroid asteroid : asteroids) {
            asteroid.update();
        }

        // Remove off-screen asteroids
        asteroids.removeIf(a -> a.isOffScreen(panelHeight));
    }

    // Draw all asteroids
    public void draw(Graphics g) {
        for (WordAsteroid asteroid : asteroids) {
            asteroid.draw(g);
        }
    }

    // Getter for the list of asteroids (useful for typed word detection)
    public List<WordAsteroid> getAsteroids() {
        return asteroids;
    }
}
