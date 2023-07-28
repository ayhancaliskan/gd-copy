function getUserRoleFromRequest(req) {
  // Assurez-vous que userRole est bien défini dans la requête.
  // Si ce n'est pas le cas, retournez une valeur par défaut ou null.
  return req.userRole || null;
}

function checkUserRights(req, res, next) {
  const userRole = getUserRoleFromRequest(req);

  // Log pour le débogage. Vous pouvez le supprimer une fois que tout fonctionne correctement.
  console.log(`UserRole: ${userRole}`);
  console.log(`Original URL: ${req.originalUrl}`);

  const validRoles = ["/admin", "/vendor", "/driver"];

  // Vérifiez si userRole est null ou non défini.
  if (!userRole) {
    return res.status(400).send("Le rôle de l'utilisateur est manquant ou invalide.");
  }

  // Vérifiez si le rôle de l'utilisateur est valide et s'il correspond à l'URL d'origine.
  
  if (!validRoles.includes(userRole) || !req.originalUrl.slice(1).startsWith(userRole.slice(1))) {
    return res.status(403).send("Accès refusé.");
  }

  next();
}

module.exports = checkUserRights;
