class OrgInfo implements Comparable<OrgInfo>{

    public double OrgID;
    public Double OrgScore;

    OrgInfo(double OrgID, double OrgScore){
        this.OrgID = OrgID;
        this.OrgScore = OrgScore;
    }

    public Double getOrgScore(){
        return this.OrgScore;
    }

    @Override
	public int compareTo(OrgInfo e) {
		return this.getOrgScore().compareTo(e.getOrgScore());
	}

}