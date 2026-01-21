<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Eingaben bereinigen
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);

    // HIER IHRE E-MAIL-ADRESSE EINTRAGEN:
    $recipient = "info@lider-einkaufsparadies.de"; 
    
    $subject = "Neue Nachricht von $name (Webseite)";
    
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Nachricht:\n$message\n";

    $email_headers = "From: $name <$email>";

    // E-Mail senden
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        // Erfolg: Zurück zur Seite mit Erfolgsmeldung
        header("Location: index.html?status=success#kontakt");
    } else {
        // Fehler: Zurück zur Seite mit Fehlermeldung
        header("Location: index.html?status=error#kontakt");
    }
} else {
    // Falls jemand die Datei direkt aufruft
    header("Location: index.html");
}
?>