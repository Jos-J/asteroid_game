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
