CREATE PROCEDURE Parking.PersonLogin
    @plate VARCHAR(6),
    @stateCode CHAR(2)
AS
BEGIN
    SELECT 1 FROM Parking.People P WHERE P.LicensePlate = @plate AND P.StateCode = @stateCode;
END;

DROP PROCEDURE Parking.PersonLogin;