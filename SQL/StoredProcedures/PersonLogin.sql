DROP PROCEDURE IF EXISTS Parking.PersonLogin;

GO

CREATE PROCEDURE Parking.PersonLogin
    @plate VARCHAR(6),
    @stateCode CHAR(2)
AS
BEGIN
    SELECT P.PersonID FROM Parking.People P WHERE P.LicensePlate = @plate AND P.StateCode = @stateCode;
END;