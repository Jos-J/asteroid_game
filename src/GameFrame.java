import javax.swing.Jframe;

pubic class GameFrame extends JFrame {

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