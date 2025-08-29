package src;

import javax.swing.*;

public class GameFrame extends JFrame {
    public GameFrame() {
        setTitle("Asteroid Typing Game");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setResizable(false);

        GamePanel panel = new GamePanel();
        add(panel);
        pack();
        setLocationRelativeTo(null);
        setVisible(true);
        
        panel.startGame();
    }

    public static void main(String[] args) {
        new GameFrame();
    }
}

    
/*
GamePanel panel;
    GameFrame() {
        panel = new GamePanel();
        this.add(panel);
        this.setTitle("AsteroidGame");
        this.setDefaultCloseOperation(JFrame.EXIT_ON_close);
        this.setResizable(false);
        this.pack();
        this.setVisible(true);
        this.setLocationRelativeTo(null); // Center Window
        
    }
}
*/