DROP PROCEDURE IF EXISTS Parking.OfficerLogin;

GO

CREATE PROCEDURE Parking.OfficerLogin
    @username VARCHAR(50),
    @password VARCHAR(255)
AS
BEGIN
    SELECT 1 FROM Parking.Officers O WHERE O.Username = @username AND O.HashPassword = @password;
END;