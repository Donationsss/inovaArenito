<?php
session_start();
session_destroy();
setcookie('usuario_id', '', time() - 3600, '/'); // Remove cookie se usou remember me
header("Location: login.php?logout=success");
exit;
